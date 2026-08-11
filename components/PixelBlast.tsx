"use client";

/**
 * PixelBlast — React Bits Pro (JavaScript + Tailwind variant), ported to
 * TypeScript to match how the rest of the vendored React Bits components in
 * this repo are kept (see RotatingText, StaggeredMenu).
 *
 * Component inspired by github.com/zavalit/bayer-dithering-webgl-demo
 *
 * Deviations from the upstream source are each marked `UPSTREAM FIX:` or
 * `LOCAL:` below so a future re-pull from React Bits stays traceable.
 */

import { Effect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import * as THREE from "three";
/**
 * LOCAL: the GLSL, its shape enum and MAX_CLICKS were lifted verbatim into
 * `pixelBlastShader.ts` so the 3D hero can render the same effect onto a
 * monitor screen inside a react-three-fiber scene. Nothing about the shader
 * changed in the move — a re-pull from React Bits only needs to diff that file
 * against upstream's inline copy.
 */
import {
  FRAGMENT_SRC,
  MAX_CLICKS,
  SHAPE_MAP,
  VERTEX_SRC,
  type PixelBlastVariant,
} from "./pixelBlastShader";

export type { PixelBlastVariant };

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getReducedMotionServerSnapshot = () => false;

type TouchTexture = {
  canvas: HTMLCanvasElement;
  texture: THREE.Texture;
  addTouch: (norm: { x: number; y: number }) => void;
  update: () => void;
  radiusScale: number;
  size: number;
};

type TrailPoint = {
  x: number;
  y: number;
  age: number;
  force: number;
  vx: number;
  vy: number;
};

const createTouchTexture = (): TouchTexture => {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context not available");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.Texture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  const trail: TrailPoint[] = [];
  let last: { x: number; y: number } | null = null;
  const maxAge = 64;
  let radius = 0.1 * size;
  const speed = 1 / maxAge;
  const clear = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  const drawPoint = (p: TrailPoint) => {
    const pos = { x: p.x * size, y: (1 - p.y) * size };
    let intensity = 1;
    const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2);
    const easeOutQuad = (t: number) => -t * (t - 2);
    if (p.age < maxAge * 0.3) intensity = easeOutSine(p.age / (maxAge * 0.3));
    else intensity = easeOutQuad(1 - (p.age - maxAge * 0.3) / (maxAge * 0.7)) || 0;
    intensity *= p.force;
    const color = `${((p.vx + 1) / 2) * 255}, ${((p.vy + 1) / 2) * 255}, ${intensity * 255}`;
    const offset = size * 5;
    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = offset;
    ctx.shadowBlur = radius;
    ctx.shadowColor = `rgba(${color},${0.22 * intensity})`;
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    ctx.fill();
  };
  const addTouch = (norm: { x: number; y: number }) => {
    let force = 0;
    let vx = 0;
    let vy = 0;
    if (last) {
      const dx = norm.x - last.x;
      const dy = norm.y - last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);
      vx = dx / (d || 1);
      vy = dy / (d || 1);
      force = Math.min(dd * 10000, 1);
    }
    last = { x: norm.x, y: norm.y };
    trail.push({ x: norm.x, y: norm.y, age: 0, force, vx, vy });
  };
  const update = () => {
    clear();
    for (let i = trail.length - 1; i >= 0; i--) {
      const point = trail[i];
      const f = point.force * speed * (1 - point.age / maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;
      if (point.age > maxAge) trail.splice(i, 1);
    }
    for (let i = 0; i < trail.length; i++) drawPoint(trail[i]);
    texture.needsUpdate = true;
  };
  return {
    canvas,
    texture,
    addTouch,
    update,
    set radiusScale(v: number) {
      radius = 0.1 * size * v;
    },
    get radiusScale() {
      return radius / (0.1 * size);
    },
    size,
  };
};

const createLiquidEffect = (texture: THREE.Texture, opts?: { strength?: number; freq?: number }) => {
  const fragment = `
    uniform sampler2D uTexture;
    uniform float uStrength;
    uniform float uTime;
    uniform float uFreq;

    void mainUv(inout vec2 uv) {
      vec4 tex = texture2D(uTexture, uv);
      float vx = tex.r * 2.0 - 1.0;
      float vy = tex.g * 2.0 - 1.0;
      float intensity = tex.b;

      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);

      float amt = uStrength * intensity * wave;

      uv += vec2(vx, vy) * amt;
    }
    `;
  return new Effect("LiquidEffect", fragment, {
    uniforms: new Map<string, THREE.Uniform>([
      ["uTexture", new THREE.Uniform(texture)],
      ["uStrength", new THREE.Uniform(opts?.strength ?? 0.025)],
      ["uTime", new THREE.Uniform(0)],
      ["uFreq", new THREE.Uniform(opts?.freq ?? 4.5)],
    ]),
  });
};

export type PixelBlastProps = {
  variant?: PixelBlastVariant;
  pixelSize?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  antialias?: boolean;
  patternScale?: number;
  patternDensity?: number;
  liquid?: boolean;
  liquidStrength?: number;
  liquidRadius?: number;
  pixelSizeJitter?: number;
  enableRipples?: boolean;
  rippleIntensityScale?: number;
  rippleThickness?: number;
  rippleSpeed?: number;
  liquidWobbleSpeed?: number;
  autoPauseOffscreen?: boolean;
  speed?: number;
  transparent?: boolean;
  edgeFade?: number;
  noiseAmount?: number;
};

type ThreeState = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  material: THREE.ShaderMaterial;
  clock: THREE.Clock;
  clickIx: number;
  uniforms: Record<string, THREE.IUniform>;
  resizeObserver: ResizeObserver;
  intersectionObserver?: IntersectionObserver;
  raf: number;
  quad: THREE.Mesh;
  timeOffset: number;
  composer?: EffectComposer;
  touch?: TouchTexture;
  liquidEffect?: Effect;
};

const PixelBlast = ({
  variant = "square",
  pixelSize = 3,
  color = "#B497CF",
  className,
  style,
  antialias = true,
  patternScale = 2,
  patternDensity = 1,
  liquid = false,
  liquidStrength = 0.1,
  liquidRadius = 1,
  pixelSizeJitter = 0,
  enableRipples = true,
  rippleIntensityScale = 1,
  rippleThickness = 0.1,
  rippleSpeed = 0.3,
  liquidWobbleSpeed = 4.5,
  autoPauseOffscreen = true,
  speed = 0.5,
  transparent = true,
  edgeFade = 0.5,
  noiseAmount = 0,
}: PixelBlastProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visibilityRef = useRef({ visible: true });
  const speedRef = useRef(speed);

  const threeRef = useRef<ThreeState | null>(null);
  const prevConfigRef = useRef<{ antialias: boolean; liquid: boolean; noiseAmount: number } | null>(null);
  const disposeRef = useRef<(() => void) | null>(null);

  /**
   * LOCAL: the site honours `prefers-reduced-motion` for every other ambient
   * animation (see the ticker rules in globals.css). A full-bleed
   * animated shader is exactly the kind of thing that setting exists for, so
   * when it's on we paint a single static frame and never start the rAF loop.
   */
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    speedRef.current = speed;
    const needsReinitKeys = ["antialias", "liquid", "noiseAmount"] as const;
    const cfg = { antialias, liquid, noiseAmount };
    let mustReinit = false;
    if (!threeRef.current) mustReinit = true;
    else if (prevConfigRef.current) {
      for (const k of needsReinitKeys)
        if (prevConfigRef.current[k] !== cfg[k]) {
          mustReinit = true;
          break;
        }
    }

    /** Idempotent teardown, shared by the reinit path, the effect cleanup and
     *  the unmount-only effect below. */
    const disposeThree = () => {
      const t = threeRef.current;
      if (!t) return;
      t.resizeObserver?.disconnect();
      t.intersectionObserver?.disconnect();
      cancelAnimationFrame(t.raf);
      t.quad?.geometry.dispose();
      t.material.dispose();
      t.composer?.dispose();
      t.renderer.dispose();
      t.renderer.forceContextLoss();
      if (t.renderer.domElement.parentElement === container)
        container.removeChild(t.renderer.domElement);
      threeRef.current = null;
    };
    disposeRef.current = disposeThree;

    if (mustReinit) {
      disposeThree();

      // LOCAL: `new THREE.WebGLRenderer` throws synchronously when no WebGL
      // context can be created (WebGL disabled, some corporate lockdowns,
      // sandboxed/headless browsers with no software rasterizer). Uncaught,
      // that throw crashes the whole page. Request the context first so null
      // can degrade to the CSS brand surface, then pass that exact context to
      // THREE instead of consuming a second context with a throwaway probe.
      // Probe on the actual renderer canvas and pass that same context into
      // THREE. A separate probe canvas consumes a second WebGL context on every
      // mount; repeated client navigations can exhaust Chromium's context pool
      // even though each probe reported success.
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2", {
        antialias,
        alpha: true,
        powerPreference: "high-performance",
      });
      if (!context) {
        console.warn("[PixelBlast] WebGL unavailable; skipping decorative field.");
        prevConfigRef.current = cfg;
        return () => {};
      }

      const renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        antialias,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
      if (transparent) renderer.setClearAlpha(0);
      else renderer.setClearColor(0x000000, 1);
      const uniforms: Record<string, THREE.IUniform> = {
        uResolution: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uClickPos: {
          value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1)),
        },
        uClickTimes: { value: new Float32Array(MAX_CLICKS) },
        uShapeType: { value: SHAPE_MAP[variant] ?? 0 },
        uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
        uScale: { value: patternScale },
        uDensity: { value: patternDensity },
        uPixelJitter: { value: pixelSizeJitter },
        uEnableRipples: { value: enableRipples ? 1 : 0 },
        uRippleSpeed: { value: rippleSpeed },
        uRippleThickness: { value: rippleThickness },
        uRippleIntensity: { value: rippleIntensityScale },
        uEdgeFade: { value: edgeFade },
      };
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SRC,
        fragmentShader: FRAGMENT_SRC,
        uniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        glslVersion: THREE.GLSL3,
      });
      const quadGeom = new THREE.PlaneGeometry(2, 2);
      const quad = new THREE.Mesh(quadGeom, material);
      scene.add(quad);
      const clock = new THREE.Clock();
      let composer: EffectComposer | undefined;
      let touch: TouchTexture | undefined;
      let liquidEffect: Effect | undefined;

      /**
       * UPSTREAM FIX: upstream passes the *drawing-buffer* size to
       * `composer.setSize(w, h)` and lets its `updateStyle` default to true, so
       * postprocessing stamps buffer pixels back on as CSS pixels and
       * re-multiplies by the device pixel ratio. On a DPR-1.25 display that
       * blew the canvas up to 125% of its container (clipped by overflow-hidden)
       * and left the drawing buffer disagreeing with `uResolution`, which the
       * shader uses for aspect ratio and edge fade. postprocessing wants CSS
       * pixels and derives the buffer size itself.
       */
      const setSize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h, false);
        uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
        composer?.setSize(w, h, false);
        uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
      };

      /**
       * UPSTREAM FIX: `autoPauseOffscreen` is read in the animate loop via
       * `visibilityRef`, but nothing upstream ever writes to that ref, so the
       * prop is inert and the shader keeps rendering behind the whole page.
       * Wire it to a real IntersectionObserver.
       */
      let io: IntersectionObserver | undefined;
      if (autoPauseOffscreen) {
        io = new IntersectionObserver(
          ([entry]) => {
            visibilityRef.current.visible = entry.isIntersecting;
          },
          { rootMargin: "100px" }
        );
        io.observe(container);
      }

      const randomFloat = () => {
        if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
          const u32 = new Uint32Array(1);
          window.crypto.getRandomValues(u32);
          return u32[0] / 0xffffffff;
        }
        return Math.random();
      };
      const timeOffset = randomFloat() * 1000;
      if (liquid) {
        touch = createTouchTexture();
        touch.radiusScale = liquidRadius;
        composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        liquidEffect = createLiquidEffect(touch.texture, {
          strength: liquidStrength,
          freq: liquidWobbleSpeed,
        });
        const effectPass = new EffectPass(camera, liquidEffect);
        effectPass.renderToScreen = true;
        composer.addPass(renderPass);
        composer.addPass(effectPass);
      }
      if (noiseAmount > 0) {
        if (!composer) {
          composer = new EffectComposer(renderer);
          composer.addPass(new RenderPass(scene, camera));
        }
        const noiseEffect = new Effect(
          "NoiseEffect",
          `uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} `,
          {
            uniforms: new Map<string, THREE.Uniform>([
              ["uTime", new THREE.Uniform(0)],
              ["uAmount", new THREE.Uniform(noiseAmount)],
            ]),
          }
        );
        const noisePass = new EffectPass(camera, noiseEffect);
        noisePass.renderToScreen = true;
        if (composer && composer.passes.length > 0)
          composer.passes.forEach((p) => (p.renderToScreen = false));
        composer.addPass(noisePass);
      }
      // Sized once here, after the composer exists, so the first frame is
      // already correct; the ResizeObserver below keeps it that way.
      setSize();
      const ro = new ResizeObserver(setSize);
      ro.observe(container);
      const mapToPixels = (e: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        const scaleX = renderer.domElement.width / rect.width;
        const scaleY = renderer.domElement.height / rect.height;
        const fx = (e.clientX - rect.left) * scaleX;
        const fy = (rect.height - (e.clientY - rect.top)) * scaleY;
        return {
          fx,
          fy,
          w: renderer.domElement.width,
          h: renderer.domElement.height,
        };
      };
      const onPointerDown = (e: PointerEvent) => {
        const { fx, fy } = mapToPixels(e);
        const ix = threeRef.current?.clickIx ?? 0;
        uniforms.uClickPos.value[ix].set(fx, fy);
        uniforms.uClickTimes.value[ix] = uniforms.uTime.value;
        if (threeRef.current) threeRef.current.clickIx = (ix + 1) % MAX_CLICKS;
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!touch) return;
        const { fx, fy, w, h } = mapToPixels(e);
        touch.addTouch({ x: fx / w, y: fy / h });
      };
      if (!reducedMotion) {
        renderer.domElement.addEventListener("pointerdown", onPointerDown, {
          passive: true,
        });
        // pointermove only feeds the liquid touch texture — without it the
        // handler is a no-op on every mouse move, so don't register it.
        if (touch)
          renderer.domElement.addEventListener("pointermove", onPointerMove, {
            passive: true,
          });
      }
      let raf = 0;
      const renderFrame = () => {
        if (composer) {
          if (touch) touch.update();
          composer.passes.forEach((p) => {
            const effs = (p as unknown as { effects?: Effect[] }).effects;
            if (effs)
              effs.forEach((eff) => {
                const u = eff.uniforms?.get("uTime");
                if (u) u.value = uniforms.uTime.value;
              });
          });
          composer.render();
        } else renderer.render(scene, camera);
      };
      const animate = () => {
        if (autoPauseOffscreen && !visibilityRef.current.visible) {
          raf = requestAnimationFrame(animate);
          return;
        }
        uniforms.uTime.value = timeOffset + clock.getElapsedTime() * speedRef.current;
        if (liquidEffect) liquidEffect.uniforms.get("uTime")!.value = uniforms.uTime.value;
        renderFrame();
        raf = requestAnimationFrame(animate);
      };
      if (reducedMotion) {
        // Single static frame: no clock, no loop.
        uniforms.uTime.value = timeOffset;
        if (liquidEffect) liquidEffect.uniforms.get("uTime")!.value = timeOffset;
        renderFrame();
      } else {
        raf = requestAnimationFrame(animate);
      }
      threeRef.current = {
        renderer,
        scene,
        camera,
        material,
        clock,
        clickIx: 0,
        uniforms,
        resizeObserver: ro,
        intersectionObserver: io,
        raf,
        quad,
        timeOffset,
        composer,
        touch,
        liquidEffect,
      };
    } else {
      const t = threeRef.current!;
      t.uniforms.uShapeType.value = SHAPE_MAP[variant] ?? 0;
      t.uniforms.uPixelSize.value = pixelSize * t.renderer.getPixelRatio();
      t.uniforms.uColor.value.set(color);
      t.uniforms.uScale.value = patternScale;
      t.uniforms.uDensity.value = patternDensity;
      t.uniforms.uPixelJitter.value = pixelSizeJitter;
      t.uniforms.uEnableRipples.value = enableRipples ? 1 : 0;
      t.uniforms.uRippleIntensity.value = rippleIntensityScale;
      t.uniforms.uRippleThickness.value = rippleThickness;
      t.uniforms.uRippleSpeed.value = rippleSpeed;
      t.uniforms.uEdgeFade.value = edgeFade;
      if (transparent) t.renderer.setClearAlpha(0);
      else t.renderer.setClearColor(0x000000, 1);
      if (t.liquidEffect) {
        // UPSTREAM FIX: upstream assigns `.value` onto the Effect itself
        // (`const uStrength = t.liquidEffect`), so liquidStrength never reached
        // the shader. Read the uniform out of the map like uFreq does.
        const uStrength = t.liquidEffect.uniforms.get("uStrength");
        if (uStrength) uStrength.value = liquidStrength;
        const uFreq = t.liquidEffect.uniforms.get("uFreq");
        if (uFreq) uFreq.value = liquidWobbleSpeed;
      }
      if (t.touch) t.touch.radiusScale = liquidRadius;
    }
    prevConfigRef.current = cfg;
    return () => {
      // Prop changes that don't need a rebuild keep the live context: the
      // branch above mutates uniforms in place on the next run.
      if (threeRef.current && mustReinit) return;
      disposeThree();
    };
  }, [
    antialias,
    liquid,
    noiseAmount,
    pixelSize,
    patternScale,
    patternDensity,
    enableRipples,
    rippleIntensityScale,
    rippleThickness,
    rippleSpeed,
    pixelSizeJitter,
    edgeFade,
    transparent,
    liquidStrength,
    liquidRadius,
    liquidWobbleSpeed,
    autoPauseOffscreen,
    variant,
    color,
    speed,
    reducedMotion,
  ]);

  /**
   * UPSTREAM FIX: the cleanup above bails out whenever the run that created the
   * context was itself a reinit, which is also true on a plain mount → unmount.
   * Upstream therefore leaks the WebGL context every time the component leaves
   * the tree (client-side route changes here). An unmount-only effect tears it
   * down for real; `disposeThree` is idempotent so the double call is safe.
   */
  useEffect(() => () => disposeRef.current?.(), []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden ${className ?? ""}`}
      style={style}
      aria-label="PixelBlast interactive background"
    />
  );
};

export default PixelBlast;
