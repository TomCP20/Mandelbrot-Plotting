import { Canvas, ThreeEvent } from '@react-three/fiber'
import './App.css'
import fragmentShader from './shaders/fragmentShader.glsl??raw'
import vertexShader from './shaders/vertexShader.glsl??raw'
import { useMemo, useRef, useState } from 'react';
import { ShaderMaterial, Vector2 } from 'three';
import { button, useControls } from 'leva';

export default function App() {
  const ref = useRef<ShaderMaterial>(null!)
  const [drag, setDrag] = useState(false);
  const uniforms = useMemo(() => ({
    size: { value: new Vector2(2.47, 2.24) },
    offset: { value: new Vector2(-2, -1.12) },
    max_iteration: { value: 100 },
  }), []);
  function handleScroll(event: ThreeEvent<WheelEvent>) {
    const x = event.unprojectedPoint.x * ref.current.uniforms.size.value.x + ref.current.uniforms.offset.value.x;
    const y = event.unprojectedPoint.y * ref.current.uniforms.size.value.y + ref.current.uniforms.offset.value.y;
    const zoom = 1 + event.deltaY / 1000;
    ref.current.uniforms.offset.value.x = x + zoom * (ref.current.uniforms.offset.value.x - x);
    ref.current.uniforms.offset.value.y = y + zoom * (ref.current.uniforms.offset.value.y - y);
    ref.current.uniforms.size.value.x *= zoom;
    ref.current.uniforms.size.value.y *= zoom;
  }
  function handleMove(event: ThreeEvent<PointerEvent>) {
    if (drag) {
      ref.current.uniforms.offset.value.x -= (event.movementX / event.screenX) * ref.current.uniforms.size.value.x;
      ref.current.uniforms.offset.value.y += (event.movementY / event.screenY) * ref.current.uniforms.size.value.y;
    }
  }

  useControls({
    "max iteration": {
      value: 100,
      min: 100,
      max: 1000,
      onChange: (value: number) => {
        if (ref.current) {
          ref.current.uniforms.max_iteration.value = value;
        }
      }
    }
  });

  useControls({
    "reset zoom": button(() => {
      ref.current.uniforms.size.value = new Vector2(2.47, 2.24);
      ref.current.uniforms.offset.value = new Vector2(-2, -1.12);
    })
  });

  return (
    <div className='h-screen'>
      <Canvas orthographic camera={{ left: 0, right: 1, bottom: 0, top: 1 }} gl={{ preserveDrawingBuffer: true }}>
        <mesh scale={2} onWheel={handleScroll} onPointerMove={handleMove} onPointerDown={() => setDrag(true)} onPointerUp={() => setDrag(false)} onPointerLeave={() => setDrag(false)}>
          <planeGeometry />
          <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} ref={ref} />
        </mesh>
      </Canvas>
    </div>
  )
}
