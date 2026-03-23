// composite.vert.glsl
// Standard passthrough for a fullscreen PlaneGeometry(2,2).
// With an orthographic camera (near:-1, far:1) a plane at z=0 fills
// the viewport exactly in clip space — no projection math needed.

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
