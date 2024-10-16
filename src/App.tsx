import { Canvas } from '@react-three/fiber'
import './App.css'
import fragmentShader from './shaders/fragmentShader.glsl??raw'
import vertexShader from './shaders/vertexShader.glsl??raw'

export default function App() {
  return (
    <div className='h-screen'>
    <Canvas orthographic camera={{ left: -1, right: 1, bottom: -1, top: 1 }} gl={{ preserveDrawingBuffer: true }}>
      <mesh scale={2}>
        <planeGeometry />
        <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} />
      </mesh>
    </Canvas>
    </div>
  )
}