// brush.vert.glsl
// Billboard vertex shader: positions the brush stamp quad in NDC space
// without going through the camera/projection matrix, so it works purely
// in UV-space coordinates on the mask render target.

uniform vec2  uCenter; // stamp center in [0,1] UV space of the mask target
uniform vec2  uScale;  // (halfWidthUV, halfHeightUV) — controls stamp size
uniform float uAngle;  // rotation: atan2(vy, vx) of velocity direction

varying vec2 vUv;

void main() {
  vUv = uv; // PlaneGeometry UVs [0,1]

  // Rotate local vertex position by stroke angle
  float c = cos(uAngle);
  float s = sin(uAngle);
  vec2 rotated = vec2(
    position.x * c - position.y * s,
    position.x * s + position.y * c
  );

  // Convert center from [0,1] to NDC [-1,1]
  vec2 ndcCenter = uCenter * 2.0 - 1.0;

  // Scale and offset to final NDC position
  vec2 ndcPos = ndcCenter + rotated * uScale * 2.0;

  gl_Position = vec4(ndcPos, 0.0, 1.0);
}
