// composite.frag.glsl
// Composites the desk photo + procedural paper texture using the mask FBO.
// maskVal=1.0 → paper visible (covered); maskVal=0.0 → photo visible (revealed).

precision highp float;

uniform sampler2D uPhoto;        // desk-scene.jpg
uniform sampler2D uMask;         // WebGLRenderTarget: white=covered, black=revealed
uniform vec2      uParallax;     // normalized mouse [-1,1] in each axis
uniform vec2      uParallaxScale;// (14/w, 10/h) — matches original pixel travel
uniform vec2      uResolution;   // viewport size for pixel-space noise
uniform float     uTime;         // unused currently, available for grain shimmer

varying vec2 vUv;

// ── Value noise (same as brush shader) ────────────────────────────────────

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 19.19);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// ──────────────────────────────────────────────────────────────────────────

void main() {
  // ── 1. Desk photo with parallax ──────────────────────────────────────────
  // uParallax [-1,1] × uParallaxScale → UV offset matching original ±14px/±10px
  vec2 photoUv = vUv + uParallax * uParallaxScale;
  photoUv = clamp(photoUv, 0.0, 1.0);
  vec4 photo = texture2D(uPhoto, photoUv);

  // ── 2. Procedural canvas / paper texture ─────────────────────────────────
  vec2 px = vUv * uResolution; // pixel-space coords

  // Warm cream base: #f0ece5
  vec3 paperBase = vec3(0.941, 0.925, 0.898);

  // Paper grain: 3-octave noise in pixel space
  float grain = noise(px * 0.80) * 0.500
              + noise(px * 1.60) * 0.250
              + noise(px * 3.20) * 0.125;
  float grainVal = (grain - 0.5) * 0.10;
  vec3 paperColor = paperBase + vec3(grainVal, grainVal - 0.002, grainVal - 0.006);

  // Horizontal hatching lines — pencil sketch underpainting feel
  // Spacing varies slightly row-by-row via low-freq noise for hand-drawn look
  float lineSpacing = 7.0;
  float rowIndex    = floor(px.y / lineSpacing);
  float wiggle      = noise(vec2(px.x * 0.018, rowIndex)) * 0.35;
  float lineY       = fract(px.y / lineSpacing);
  float lineMask    = smoothstep(0.93 + wiggle * 0.04, 1.00, lineY)
                    + smoothstep(0.07 - wiggle * 0.04, 0.00, lineY);
  lineMask = clamp(lineMask, 0.0, 1.0);
  // rgba(60,50,40,0.06) — matches original CSS stroke opacity
  paperColor = mix(paperColor, vec3(0.235, 0.196, 0.157), lineMask * 0.06);

  // Loose diagonal sketch marks suggesting depth / composition
  float diagNoise = noise(vec2(
    (px.x + px.y * 0.55) * 0.0038,
    (px.y - px.x * 0.30) * 0.0038
  ));
  float diagMark = step(0.77, diagNoise) * 0.05;
  paperColor = mix(paperColor, vec3(0.196, 0.157, 0.118), diagMark);

  // ── 3. Mask readback ────────────────────────────────────────────────────
  // Red channel: 1.0 = fully covered by paper, 0.0 = fully revealed (photo)
  float maskVal = texture2D(uMask, vUv).r;

  // ── 4. Composite ────────────────────────────────────────────────────────
  vec3 composited = mix(photo.rgb, paperColor, maskVal);

  gl_FragColor = vec4(composited, 1.0);
}
