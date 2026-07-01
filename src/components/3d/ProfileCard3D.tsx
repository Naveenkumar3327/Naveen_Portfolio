"use client";

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CardVisuals() {
  const cardRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Tracking mouse offsets relative to target center
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Tilt calculations
    if (cardRef.current) {
      const targetRotationX = mouse.y * 0.35;
      const targetRotationY = mouse.x * 0.35;
      
      cardRef.current.rotation.x = THREE.MathUtils.lerp(cardRef.current.rotation.x, targetRotationX, 0.08);
      cardRef.current.rotation.y = THREE.MathUtils.lerp(cardRef.current.rotation.y, targetRotationY, 0.08);
      
      // Fine float
      cardRef.current.position.y = Math.sin(time * 1.5) * 0.12;
    }

    if (innerRef.current) {
      // Spinning tech grid rings
      innerRef.current.rotation.z = time * 0.25;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#6366f1" />
      <pointLight position={[-4, -4, 4]} intensity={1.0} color="#06b6d4" />

      {/* Main Frosted Glass Slab */}
      <mesh ref={cardRef} castShadow receiveShadow>
        <boxGeometry args={[3.0, 4.2, 0.08]} />
        <meshPhysicalMaterial
          color="#f1f5f9"
          metalness={0.1}
          roughness={0.12}
          transmission={0.8}
          thickness={0.6}
          ior={1.48}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transparent
          opacity={0.85}
        />
        
        {/* Tech Grid Rings inside the card */}
        <group ref={innerRef} position={[0, 0, 0.02]}>
          <mesh>
            <ringGeometry args={[0.7, 0.72, 32]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.45, 0.47, 4]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[1.1, 0.015, 0.01]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[1.1, 0.015, 0.01]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
          </mesh>
        </group>
      </mesh>
    </>
  );
}

export default function ProfileCard3D() {
  return (
    <div className="w-full h-[320px] md:h-[450px] relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <CardVisuals />
      </Canvas>
    </div>
  );
}
