import { useRef, useMemo, useEffect, Suspense, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { MotionValue } from 'framer-motion'

import MaskPainter, { type MaskPainterHandle, type StampDescriptor } from './MaskPainter'
import CompositeMesh from './CompositeMesh'
import { useSketchPlayback } from './useSketchPlayback'

interface HeroSceneProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  painterRef: React.RefObject<MaskPainterHandle | null>
}

function SceneInner({ mouseX, mouseY, painterRef }: HeroSceneProps) {
  const { size, gl } = useThree()

  // Create / recreate the mask WebGLRenderTarget whenever viewport size changes
  const maskFBO = useMemo(() => {
    const fbo = new THREE.WebGLRenderTarget(size.width, size.height, {
      minFilter:     THREE.LinearFilter,
      magFilter:     THREE.LinearFilter,
      format:        THREE.RGBAFormat,
      type:          THREE.UnsignedByteType,
      depthBuffer:   false,
      stencilBuffer: false,
    })

    // Initialize to white — fully covered (paper visible everywhere)
    const prev = gl.getRenderTarget()
    gl.setRenderTarget(fbo)
    gl.setClearColor(0xffffff, 1)
    gl.clear()
    if (prev) gl.setRenderTarget(prev)
    else gl.setRenderTarget(null)

    return fbo
  }, [size.width, size.height, gl])

  useEffect(() => () => maskFBO.dispose(), [maskFBO])

  // Stable addStamp callback that forwards to the imperative painter handle
  const addStamp = useCallback((stamp: StampDescriptor) => {
    painterRef.current?.addStamp(stamp)
  }, [painterRef])

  // Auto-reveal diagonal sketch strokes on mount
  useSketchPlayback({ onStamp: addStamp, ready: true })

  return (
    <>
      <MaskPainter ref={painterRef} maskFBO={maskFBO} />
      <Suspense fallback={null}>
        <CompositeMesh maskFBO={maskFBO} mouseX={mouseX} mouseY={mouseY} />
      </Suspense>
    </>
  )
}

export default function HeroScene(props: HeroSceneProps) {
  return <SceneInner {...props} />
}
