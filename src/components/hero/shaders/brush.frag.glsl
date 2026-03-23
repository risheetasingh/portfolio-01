// brush.frag.glsl
// Ink wash brush stamp: velocity-aware ellipse with fBm noise on the boundary
// for organic ragged edges. Output alpha is subtracted from the mask FBO
// via CustomBlending (destination-out equivalent).

precision highp float;

uniform float uSpeed;   // 0..1, controls ellipse elongation
uniform float uOpacity; // per-stamp opacity, 0.8–1.0
uniform float uTime;    // seed for noise variation between strokes

varying vec2 vUv;

// ── Value noise ────────────────────────────────────────────────────────────

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

// 4-octave fBm
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p  = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

// ──────────────────────────────────────────────────────────────────────────

void main() {
  // Map UVs from [0,1] to [-1,1] centered
  vec2 uv = vUv * 2.0 - 1.0;

  // Velocity stretch: speed=0 → circle, speed=1 → ~2.8:1 ellipse along X
  // (rotation to velocity direction is handled in the vertex shader)
  float stretch = 1.0 + uSpeed * 1.8;
  vec2 scaled = vec2(uv.x / stretch, uv.y);

  float r = length(scaled);

  // fBm displacement — only applied near the ellipse boundary for ink-wash edges
  float edgeness = smoothstep(0.4, 1.0, r);
  float noiseDisp = fbm(scaled * 3.5 + uTime * 0.31) * 0.24 * edgeness;
  float rd = r + noiseDisp;

  // Smooth falloff: full opacity core, feathered edge
  float alpha = smoothstep(1.0, 0.42, rd);

  // Extra ink-blob flecks in the core
  float fleck = step(0.72, fbm(scaled * 8.0 + 7.3)) * 0.18 * smoothstep(0.55, 0.0, rd);

  float finalAlpha = clamp(alpha + fleck, 0.0, 1.0) * uOpacity;

  // Output black with computed alpha — blended into mask via destination-out
  gl_FragColor = vec4(0.0, 0.0, 0.0, finalAlpha);
}
