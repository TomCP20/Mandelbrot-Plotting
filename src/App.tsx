import { Canvas, ThreeEvent } from '@react-three/fiber'
import './App.css'
import fragmentShader from './shaders/fragmentShader.glsl??raw'
import vertexShader from './shaders/vertexShader.glsl??raw'
import { useMemo, useRef } from 'react';
import { ShaderMaterial } from 'three';

export default function App() {
  const ref = useRef<ShaderMaterial>(null!)
  const uniforms = useMemo(() => ({
    left: { value: -2 },
    right: { value: 0.47 },
    bottom: { value: -1.12 },
    top: { value: 1.12 },
  }), []);
  function handleScroll(event: ThreeEvent<WheelEvent>) {
    const x = event.unprojectedPoint.x * (ref.current.uniforms.right.value - ref.current.uniforms.left.value) + ref.current.uniforms.left.value;
    const y = event.unprojectedPoint.y * (ref.current.uniforms.top.value - ref.current.uniforms.bottom.value) + ref.current.uniforms.bottom.value;
    const zoom = 1 + event.deltaY / 1000;
    ref.current.uniforms.left.value = x + zoom * (ref.current.uniforms.left.value - x);
    ref.current.uniforms.right.value = x + zoom * (ref.current.uniforms.right.value - x);
    ref.current.uniforms.bottom.value = y + zoom * (ref.current.uniforms.bottom.value - y);
    ref.current.uniforms.top.value = y + zoom * (ref.current.uniforms.top.value - y);
    console.log();
  }
  return (
    <div className='h-screen'>
      <Canvas orthographic camera={{ left: 0, right: 1, bottom: 0, top: 1 }} gl={{ preserveDrawingBuffer: true }}>
        <mesh scale={2} onWheel={handleScroll}>
          <planeGeometry />
          <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} ref={ref} />
        </mesh>
      </Canvas>
    </div>
  )
}
