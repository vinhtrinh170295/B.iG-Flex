
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing JSX types for React Three Fiber intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshStandardMaterial: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      group: any;
    }
  }
}

const FloatingBlob = ({ position, color, speed = 1, scale = 1 }: { position: [number, number, number], color: string, speed?: number, scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      // Slight rotation and bobbing
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.2 * speed;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed;
    }
  });

  return (
    <Float speed={2 * speed} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
         <MeshDistortMaterial 
            color={color} 
            distort={0.4} 
            speed={2} 
            roughness={0.2}
            metalness={0.8}
         />
      </Sphere>
    </Float>
  );
};

const FloatingRing = () => {
   return (
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
         <Torus args={[3, 0.8, 16, 100]} position={[2, 0, -5]} rotation={[Math.PI/4, 0, 0]}>
            <meshStandardMaterial color="#9D4EDD" roughness={0.1} metalness={0.6} transparent opacity={0.8} />
         </Torus>
      </Float>
   )
}

export const GenZHeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#FF006E" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#0066FF" />
        
        {/* Abstract Composition */}
        <group position={[3, 0, 0]}>
           <FloatingBlob position={[0, 2, 0]} color="#FF006E" scale={1.5} speed={0.8} />
           <FloatingBlob position={[-2, -2, 2]} color="#0066FF" scale={1} speed={1.2} />
           <FloatingBlob position={[2, -1, -2]} color="#FFD700" scale={0.8} speed={1} />
           <FloatingRing />
        </group>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
