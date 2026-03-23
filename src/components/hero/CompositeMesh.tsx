import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import type { MotionValue } from 'framer-motion'

import compositeVert from './shaders/composite.vert.glsl?raw'
import compositeFrag from './shaders/composite.frag.glsl?raw'

interface CompositeMeshProps {
  maskFBO:  THREE.WebGLRenderTarget
  mouseX:   MotionValue<number>
  mouseY:   MotionValue<number>
}

export default function CompositeMesh({ maskFBO, mouseX, mouseY }: CompositeMeshProps) {
  const { size } = useThree()
  const photo    = useTexture('/desk-scene.jpg')

  // Ensure photo is not colour-space double-converted
  photo.colorSpace = THREE.SRGBColorSpace

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader:   compositeVert,
      fragmentShader: compositeFrag,
      uniforms: {
        uPhoto:         { value: photo },
        uMask:          { value: maskFBO.texture },
        uParallax:      { value: new THREE.Vector2(0, 0) },
        uParallaxScale: { value: new THREE.Vector2(
          14 / size.width,
          10 / size.height,
        )},
        uResolution:    { value: new THREE.Vector2(size.width, size.height) },
        uTime:          { value: 0 },
      },
      depthTest:  false,
      depthWrite: false,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo, maskFBO])

  // Update resolution + parallax scale on resize
  useEffect(() => {
    material.uniforms.uResolution.value.set(size.width, size.height)
    material.uniforms.uParallaxScale.value.set(14 / size.width, 10 / size.height)
  }, [size, material])

  // Update mask texture ref when FBO changes
  useEffect(() => {
    material.uniforms.uMask.value = maskFBO.texture
  }, [maskFBO, material])

  useFrame(({ clock }) => {
    material.uniforms.uParallax.value.set(mouseX.get(), -mouseY.get())
    material.uniforms.uTime.value = clock.elapsedTime
  })

  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    return () => material.dispose()
  }, [material])

  return (
    <mesh ref={meshRef} renderOrder={0}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}
