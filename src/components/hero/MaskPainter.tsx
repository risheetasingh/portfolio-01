import {
  useRef,
  useMemo,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import brushVert from './shaders/brush.vert.glsl?raw'
import brushFrag from './shaders/brush.frag.glsl?raw'

export interface StampDescriptor {
  cx: number    // [0,1] UV center X
  cy: number    // [0,1] UV center Y
  vx: number    // velocity direction X (normalized)
  vy: number    // velocity direction Y (normalized)
  speed: number // 0..1
}

export interface MaskPainterHandle {
  addStamp: (stamp: StampDescriptor) => void
  maskTexture: THREE.WebGLRenderTarget
}

interface MaskPainterProps {
  maskFBO: THREE.WebGLRenderTarget
}

const MaskPainter = forwardRef<MaskPainterHandle, MaskPainterProps>(
  ({ maskFBO }, ref) => {
    const { gl, size } = useThree()
    const queue        = useRef<StampDescriptor[]>([])

    // Dedicated scene so stamp renders never touch the composite mesh
    const brushScene = useMemo(() => new THREE.Scene(), [])

    // Brush ShaderMaterial — destination-out equivalent via CustomBlending
    const brushMaterial = useMemo(() => {
      const mat = new THREE.ShaderMaterial({
        vertexShader:   brushVert,
        fragmentShader: brushFrag,
        uniforms: {
          uCenter:  { value: new THREE.Vector2(0.5, 0.5) },
          uScale:   { value: new THREE.Vector2(0.06, 0.06) },
          uAngle:   { value: 0 },
          uSpeed:   { value: 0 },
          uOpacity: { value: 0.92 },
          uTime:    { value: 0 },
        },
        transparent: true,
        depthTest:   false,
        depthWrite:  false,
      })
      // Replicates Canvas 2D destination-out: dst = dst × (1 - srcAlpha)
      mat.blending        = THREE.CustomBlending
      mat.blendSrc        = THREE.ZeroFactor
      mat.blendDst        = THREE.OneMinusSrcAlphaFactor
      mat.blendEquation   = THREE.AddEquation
      mat.blendSrcAlpha   = THREE.ZeroFactor
      mat.blendDstAlpha   = THREE.OneMinusSrcAlphaFactor
      mat.blendEquationAlpha = THREE.AddEquation
      return mat
    }, [])

    // Brush mesh — a unit plane stamped per-stroke in shader space
    const brushMesh = useMemo(() => {
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), brushMaterial)
      // MUST disable frustum culling: the vertex shader writes clip-space directly,
      // bypassing camera projection. Three.js's CPU-side world-space frustum test
      // would otherwise silently skip the draw call.
      mesh.frustumCulled = false
      brushScene.add(mesh)
      return mesh
    }, [brushScene, brushMaterial])

    // Orthographic camera that matches NDC space (PlaneGeometry(2,2) fills it)
    const brushCamera = useMemo(() => {
      return new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1)
    }, [])

    useImperativeHandle(ref, () => ({
      addStamp: (stamp: StampDescriptor) => queue.current.push(stamp),
      maskTexture: maskFBO,
    }))

    useFrame(({ gl: renderer, clock }) => {
      if (queue.current.length === 0) return

      const prevAutoClear = renderer.autoClear
      renderer.autoClear = false // CRITICAL: never wipe the accumulated mask

      renderer.setRenderTarget(maskFBO)

      for (const stamp of queue.current) {
        const { cx, cy, vx, vy, speed } = stamp

        // Per-axis scale: base pixels / screen dimension gives the correct NDC radius.
        // Multiplying by DPR (capped at 2) corrects for retina displays where
        // useThree().size returns CSS pixels but the FBO is at device pixels.
        const dpr     = Math.min(window.devicePixelRatio ?? 1, 2)
        const base    = 90 * dpr
        const stretch = 1.0 + speed * 1.8
        const scaleX  = base * stretch / size.width
        const scaleY  = base / size.height

        brushMaterial.uniforms.uCenter.value.set(cx, 1.0 - cy) // flip Y (WebGL vs DOM)
        brushMaterial.uniforms.uScale.value.set(scaleX, scaleY)
        brushMaterial.uniforms.uAngle.value  = Math.atan2(vy, vx)
        brushMaterial.uniforms.uSpeed.value  = speed
        brushMaterial.uniforms.uTime.value   = clock.elapsedTime

        renderer.render(brushScene, brushCamera)
      }

      renderer.setRenderTarget(null)
      renderer.autoClear = prevAutoClear
      queue.current = []
    })

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        brushMesh.geometry.dispose()
        brushMaterial.dispose()
      }
    }, [brushMesh, brushMaterial])

    // This component renders nothing to the main scene
    return null
  }
)

MaskPainter.displayName = 'MaskPainter'
export default MaskPainter
