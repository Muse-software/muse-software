import { FRAGMENT_SRC } from "../pixelBlastShader";

/** The original Muse noise and Bayer quantiser, with a composed silhouette.
 * Native WebGL keeps this direction independent of Three/postprocessing. */
const fragmentSource = `#version 300 es\n${FRAGMENT_SRC
  .replace("uniform vec3  uColor;", "uniform vec3 uColor;\nuniform int uMosaicMode;\nuniform vec4 uCardRect;")
  .replace("float feed = base + (uDensity - 0.5) * 0.3;", `
  vec2 screen = gl_FragCoord.xy / uResolution;
  vec2 topDown = vec2(screen.x, 1.0 - screen.y);
  float feed = base + (uDensity - 0.5) * 0.3;
  float ribbon = 0.0;
  if (uMosaicMode == 0) {
    float curve = 0.78 - 0.62 * topDown.x + 0.11 * sin(topDown.x * 7.8 + 0.4)
      + 0.035 * sin(uTime * 0.19 + topDown.x * 6.0);
    float distortion = vnoise(vec3(topDown * vec2(5.5, 3.0), uTime * 0.045)) * 0.08;
    float distanceToRibbon = abs(topDown.y - curve + distortion);
    ribbon = exp(-pow(distanceToRibbon / 0.16, 2.0));
    // Keep the original evolving FBM coverage. Composition belongs in opacity,
    // not in the threshold: a density ribbon pins cells on and hides idle motion.
  }
  `)
  .replace("fragColor = vec4(srgbColor, M);", `
  if (uMosaicMode == 0) {
    float right = smoothstep(0.08, 0.72, topDown.x);
    float baseShade = 0.45 + 0.55 * ribbon;
    srgbColor *= baseShade;
    M *= (0.25 + ribbon * 0.75) * (0.2 + right * 0.8) * (1.0 - smoothstep(0.77, 1.0, topDown.y));
  } else {
    vec2 local = (gl_FragCoord.xy - uCardRect.xy) / uCardRect.zw;
    if (any(lessThan(local, vec2(0.0))) || any(greaterThan(local, vec2(1.0)))) discard;
    float vignette = 1.0 - smoothstep(0.12, 0.82, length((local - vec2(0.78, 0.55)) * vec2(0.8, 1.0)));
    M *= vignette * 0.24;
  }
  fragColor = vec4(srgbColor, M);
  `)}`;

const vertexSource = `#version 300 es
in vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

export type MosaicRenderer = {
  canvas: HTMLCanvasElement;
  resize: (width: number, height: number) => void;
  draw: (time: number, card?: DOMRect) => void;
  ripple: (x: number, y: number, time: number) => void;
  dispose: () => void;
};

export function createMosaicRenderer(mode: "hero" | "card"): MosaicRenderer | null {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  const gl = canvas.getContext("webgl2", { alpha: true, antialias: false, depth: false, stencil: false, powerPreference: "low-power", premultipliedAlpha: false });
  if (!gl) return null;
  // Without a real GPU, WebGL is emulated on the CPU (SwiftShader, llvmpipe):
  // every frame then blocks the main thread for tens of milliseconds, which is
  // what lab tools such as PageSpeed measure and what low-end devices feel.
  // Those devices get the still artwork instead, exactly like reduced motion.
  // Test-only escape hatch: the motion suite runs in headless Chromium, which
  // is itself software-rendered, and sets this flag to exercise the live path.
  const forced = (window as { __MUSE_FORCE_WEBGL?: boolean }).__MUSE_FORCE_WEBGL === true;
  if (!forced && isSoftwareRenderer(gl)) { gl.getExtension("WEBGL_lose_context")?.loseContext(); return null; }
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const shaders: WebGLShader[] = [];
  const release = () => {
    shaders.forEach((shader) => gl.deleteShader(shader));
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
  if (!program || !buffer) { release(); return null; }
  for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]] as const) {
    const shader = gl.createShader(type);
    if (!shader) { release(); return null; }
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { release(); return null; }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { release(); return null; }
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const attribute = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(attribute);
  gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const resolution = uniform("uResolution");
  const pixelSize = uniform("uPixelSize");
  const timeUniform = uniform("uTime");
  const rectUniform = uniform("uCardRect");
  const clickUniform = uniform("uClickPos[0]");
  const timesUniform = uniform("uClickTimes[0]");
  const clicks = new Float32Array(20).fill(-1);
  const clickTimes = new Float32Array(10).fill(-100);
  let clickIndex = 0;
  let ratio = 1;
  let scaleX = 1;
  let scaleY = 1;
  // sRGB #fe4701, converted to linear because the shared shader converts back.
  const linear = (value: number) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  gl.uniform3f(uniform("uColor"), linear(254 / 255), linear(71 / 255), linear(1 / 255));
  gl.uniform1i(uniform("uMosaicMode"), mode === "hero" ? 0 : 1);
  gl.uniform1i(uniform("uShapeType"), 0);
  gl.uniform1f(uniform("uScale"), mode === "hero" ? 3.0 : 4.0);
  gl.uniform1f(uniform("uDensity"), mode === "hero" ? 1.2 : 1.7);
  gl.uniform1f(uniform("uPixelJitter"), mode === "hero" ? 0.4 : 0.08);
  gl.uniform1i(uniform("uEnableRipples"), mode === "hero" ? 1 : 0);
  gl.uniform1f(uniform("uRippleSpeed"), 0.4);
  gl.uniform1f(uniform("uRippleThickness"), 0.12);
  gl.uniform1f(uniform("uRippleIntensity"), 1.3);
  gl.uniform1f(uniform("uEdgeFade"), 0);
  gl.uniform2fv(clickUniform, clicks);
  gl.uniform1fv(timesUniform, clickTimes);
  return {
    canvas,
    resize(width, height) {
      ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      scaleX = canvas.width / Math.max(1, width);
      scaleY = canvas.height / Math.max(1, height);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(pixelSize, (mode === "hero" ? (width < 650 ? 4 : 6) : 3) * ratio);
    },
    draw(time, card) {
      gl.uniform1f(timeUniform, time);
      if (card) gl.uniform4f(rectUniform, card.left * scaleX, canvas.height - card.bottom * scaleY, card.width * scaleX, card.height * scaleY);
      gl.disable(gl.SCISSOR_TEST);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (card) {
        const left = Math.max(0, Math.floor(card.left * scaleX));
        const bottom = Math.max(0, Math.floor(canvas.height - card.bottom * scaleY));
        const right = Math.min(canvas.width, Math.ceil(card.right * scaleX));
        const top = Math.min(canvas.height, Math.ceil(canvas.height - card.top * scaleY));
        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(left, bottom, Math.max(0, right - left), Math.max(0, top - bottom));
      }
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
    ripple(x, y, time) {
      clicks[clickIndex * 2] = x * scaleX;
      clicks[clickIndex * 2 + 1] = canvas.height - y * scaleY;
      clickTimes[clickIndex] = time;
      clickIndex = (clickIndex + 1) % 10;
      gl.uniform2fv(clickUniform, clicks);
      gl.uniform1fv(timesUniform, clickTimes);
    },
    dispose: release,
  };
}

const SOFTWARE_RENDERER = /swiftshader|llvmpipe|softpipe|software|basic render|lavapipe/i;
function isSoftwareRenderer(gl: WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER) || "");
  return SOFTWARE_RENDERER.test(renderer);
}
