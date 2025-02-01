import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Petal({ initialPosition }) {
  const meshRef = useRef();
  const speed = useRef({
    rotation: Math.random() * 0.02 + 0.01,
    fall: Math.random() * 0.02 + 0.01,
    sway: Math.random() * 0.02 + 0.01
  });
  const phase = useRef(Math.random() * Math.PI * 2);
  const amplitude = useRef(Math.random() * 2 + 1);

  useFrame((state) => {
    if (meshRef.current) {
      // Falling motion
      meshRef.current.position.y -= speed.current.fall;
      // Swaying motion
      meshRef.current.position.x = initialPosition.x + 
        Math.sin(state.clock.elapsedTime * speed.current.sway + phase.current) * amplitude.current;
      // Rotation
      meshRef.current.rotation.x += speed.current.rotation;
      meshRef.current.rotation.z += speed.current.rotation * 0.5;

      // Reset position when petal falls below view
      if (meshRef.current.position.y < -20) {
        meshRef.current.position.y = 20;
        meshRef.current.position.x = initialPosition.x;
      }
    }
  });

  // Create a heart shape for the petal
  const petalShape = useMemo(() => {
    const shape = new THREE.Shape();
    const width = 0.5;
    const height = 0.5;
    
    shape.moveTo(0, height * 0.5);
    shape.bezierCurveTo(
      width * 0.5, height * 0.5,
      width * 0.5, 0,
      0, -height * 0.5
    );
    shape.bezierCurveTo(
      -width * 0.5, 0,
      -width * 0.5, height * 0.5,
      0, height * 0.5
    );
    
    return shape;
  }, []);

  return (
    <mesh ref={meshRef} position={[initialPosition.x, initialPosition.y, initialPosition.z]}>
      <shapeGeometry args={[petalShape]} />
      <meshPhongMaterial 
        color="#ffb7c5"
        emissive="#ff69b4"
        emissiveIntensity={0.2}
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Petals() {
  const petals = useMemo(() => {
    return Array.from({ length: 100 }, () => ({
      position: {
        x: (Math.random() - 0.5) * 40,
        y: Math.random() * 40 - 20,
        z: (Math.random() - 0.5) * 20
      }
    }));
  }, []);

  return petals.map((petal, i) => <Petal key={i} initialPosition={petal.position} />);
}

export default function CherryBlossoms() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffb7c5" />
        <fog attach="fog" args={['#000', 15, 25]} />
        <Petals />
      </Canvas>
    </div>
  );
}