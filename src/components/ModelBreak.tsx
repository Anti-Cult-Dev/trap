import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function RotatingModel({ modelPath }) {
  const modelRef = useRef();
  const { scene } = useGLTF(modelPath, undefined, undefined, (error) => {
    console.warn('Model loading warning:', error);
  });

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  // Apply fallback material that doesn't depend on textures
  React.useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Create a new material for each mesh
        const material = new THREE.MeshPhysicalMaterial({
          color: '#ff00ff',
          emissive: '#ff00ff',
          emissiveIntensity: 2,
          transparent: true,
          opacity: 0.8,
          metalness: 1,
          roughness: 0.2,
          clearcoat: 1,
          clearcoatRoughness: 0.2,
        });
        
        // Remove any texture references
        material.map = null;
        material.normalMap = null;
        material.roughnessMap = null;
        material.metalnessMap = null;
        
        child.material = material;
      }
    });
  }, [scene]);

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={4}
    />
  );
}

function ErrorFallback() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#ff00ff"
        emissive="#ff00ff"
        emissiveIntensity={2}
        transparent
        opacity={0.8}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

export default function ModelBreak({ modelPath }) {
  return (
    <div className="h-48 w-full bg-black/40 backdrop-blur-sm relative my-12">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/5 to-transparent" />
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ff00ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00ffff" />
        
        <React.Suspense fallback={<ErrorFallback />}>
          <RotatingModel modelPath={modelPath} />
        </React.Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}