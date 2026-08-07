/**
 * Ported near-verbatim from colindmg/r3f-experimental-carousel
 * (`src/shaders/horizontal-image/{vertex,fragment}.glsl`, MIT — see
 * `THIRD-PARTY-LICENSES.md`). Only the GLSL itself moves; the surrounding
 * React/R3F code in `R3FCarouselScene.tsx` is a new adaptation (see that
 * file's header for what changed and why).
 *
 * `uCurveStrength`/`uCurveFrequency` bow each plane along a cosine of its own
 * world-space X, giving the row a static wave. `uScrollSpeed` skews each
 * plane along X in proportion to how fast it's currently moving — the
 * "wavy" part of "wavy infinite carousel," a per-frame value driven by
 * whatever advances the carousel (see `CarouselGroup`).
 */
export const carouselVertexShader = /* glsl */ `
  uniform float uScrollSpeed;
  uniform float uCurveStrength;
  uniform float uCurveFrequency;

  varying vec2 vUv;

  #define PI 3.141592653

  void main() {
    vec3 pos = position;
    vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

    // Y displacement depending on the world position X.
    float yDisplacement = uCurveStrength * cos(worldPosition.x * uCurveFrequency);
    pos.y += yDisplacement;
    pos.y -= uCurveStrength;

    // X displacement according to the current scroll/drag speed.
    float xDisplacement = -sin(uv.y * PI) * uScrollSpeed;
    pos.x += xDisplacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    vUv = uv;
  }
`;

/**
 * Cover-fit UV remap: keeps each photo's own aspect ratio inside the plane,
 * like CSS `object-fit: cover`, instead of stretching it to the plane's
 * aspect. Verbatim upstream — colour handling (sRGB decode/encode) is left to
 * `three`'s own pipeline via `texture.colorSpace` and the renderer's
 * `outputColorSpace`, set in `R3FCarouselScene.tsx`, not hand-rolled here.
 */
export const carouselFragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2 uPlaneSizes;
  uniform vec2 uImageSizes;

  varying vec2 vUv;

  void main() {
    vec2 ratio = vec2(
      min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
      min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
    );

    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    gl_FragColor = texture2D(uTexture, uv);
  }
`;
