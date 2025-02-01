import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Syringe } from 'lucide-react';

function RotatingStars() {
  const starsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={starsRef}>
      <Stars 
        radius={200}
        depth={150}
        count={10000}
        factor={8}
        saturation={0}
        fade={true}
        speed={0}
      />
    </group>
  );
}

function InitialCameraSetup() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.rotation.x = Math.PI;
  }, [camera]);
  
  return null;
}

function GlassPipe() {
  const pipeRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/src/assets/Glass_Pipe_0130123327_texture.glb');

  useFrame((state) => {
    if (pipeRef.current) {
      pipeRef.current.rotation.y += 0.005;
      pipeRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3 + 12;
      
      pipeRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;
          if (material.emissiveIntensity !== undefined) {
            material.emissiveIntensity = 2 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
          }
        }
      });
    }
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#ff00ff',
          emissive: '#ff00ff',
          emissiveIntensity: 2,
          transparent: true,
          opacity: 0.8,
          metalness: 0.9,
          roughness: 0.1,
        });
      }
    });
  }, [scene]);

  return (
    <primitive 
      ref={pipeRef}
      object={scene} 
      position={[0, 12, 0]}
      scale={6}
    />
  );
}

export default function HologramScene() {
  const [methGrams, setMethGrams] = useState(0.5);
  const maxGrams = 3.5; // An eighth
  const percentage = (methGrams / maxGrams) * 100;

  const handleBuySack = () => {
    const sackSize = 0.5; // Half gram
    const newAmount = Math.min(methGrams + sackSize, maxGrams);
    setMethGrams(newAmount);
  };

  return (
    <div className="w-full h-[600px] bg-black/90 rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/5 via-transparent to-transparent" />
      <Canvas 
        camera={{ position: [0, 12, 25], fov: 60 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ff00ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00ffff" />
        
        <Suspense fallback={null}>
          <RotatingStars />
          <InitialCameraSetup />
          <GlassPipe />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          rotateSpeed={0.3}
          target={[0, 12, 0]}
        />
        
        <fog attach="fog" args={['#000', 10, 30]} />
        
        <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial
            color="#ff00ff"
            transparent
            opacity={0.1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Canvas>
      
      {/* Status HUD */}
      <div className="absolute top-2 left-2 text-fuchsia-500/80 font-mono text-xs uppercase">
        <div>METHANY OS v0.0.1</div>
        <div>NEURAL LINK: ACTIVE</div>
        <div>PARANOIA LEVEL: HIGH</div>
      </div>
      
      <div className="absolute top-2 right-2 text-fuchsia-500/80 font-mono text-xs text-right uppercase">
        <div>LOCATION: [REDACTED]</div>
        <div>CONSPIRACY LEVEL: MAXIMUM</div>
        <div>SHADOW PEOPLE: DETECTED</div>
      </div>

      {/* Meth Meter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-96 space-y-4">
        <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-fuchsia-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Syringe className="w-5 h-5 text-fuchsia-500 rotate-45 mr-2" />
              <span className="font-['Orbitron'] text-sm text-fuchsia-500">METH INTAKE</span>
            </div>
            <span className="font-mono text-fuchsia-500">{methGrams.toFixed(1)}g / {maxGrams.toFixed(1)}g</span>
          </div>
          <div className="h-4 bg-black/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-fuchsia-600 to-purple-600 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <button
          onClick={handleBuySack}
          disabled={methGrams >= maxGrams}
          className={`w-full py-2 px-4 rounded-lg font-['Orbitron'] text-sm uppercase tracking-wider
            transition-all duration-300 ${
              methGrams >= maxGrams
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white hover:from-fuchsia-500 hover:to-purple-500'
            }`}
        >
          Buy Sack (0.5g)
        </button>
      </div>
    </div>
  );
}