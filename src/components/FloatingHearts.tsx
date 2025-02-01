import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Heart({ position, rotation, scale }) {
  const meshRef = useRef();
  const speed = useRef(Math.random() * 0.5 + 0.5);
  const amplitude = useRef(Math.random() * 0.5 + 0.5);
  const phase = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed.current + phase.current) * amplitude.current;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const geometry = new THREE.TorusGeometry(1, 0.4, 16, 32);
  const material = new THREE.MeshPhongMaterial({
    color: '#ff69b4',
    emissive: '#ff1493',
    emissiveIntensity: 0.5,
    shininess: 100,
    specular: '#ff69b4',
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={geometry} />
      <meshPhongMaterial {...material} />
    </mesh>
  );
}

function Hearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    ],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    ],
    scale: [0.3, 0.3, 0.3]
  }));

  return hearts.map((props, i) => <Heart key={i} {...props} />);
}

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff69b4" />
        <Hearts />
      </Canvas>
    </div>
  );
}