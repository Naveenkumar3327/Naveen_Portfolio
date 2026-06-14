"use client";

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Inner component to access hooks like useFrame
function HeroVisuals() {
  const crystalRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Track mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate meshes in the canvas loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate the central crystal
    if (crystalRef.current) {
      crystalRef.current.rotation.y = time * 0.15;
      crystalRef.current.rotation.x = Math.sin(time * 0.2) * 0.25;
      
      // Parallax mouse follow
      crystalRef.current.position.x = THREE.MathUtils.lerp(crystalRef.current.position.x, mouse.x * 0.8, 0.05);
      crystalRef.current.position.y = THREE.MathUtils.lerp(crystalRef.current.position.y, mouse.y * 0.8, 0.05);
    }

    // Rotate orbiting gold ring
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.08;
      ringRef.current.rotation.y = time * 0.12;
      ringRef.current.position.x = THREE.MathUtils.lerp(ringRef.current.position.x, mouse.x * 0.6, 0.04);
      ringRef.current.position.y = THREE.MathUtils.lerp(ringRef.current.position.y, mouse.y * 0.6, 0.04);
    }

    // Drift particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.02;
      particlesRef.current.rotation.x = time * 0.01;
    }
  });

  // Seed coordinates for gold dust particles
  const particleCount = 120;
  const particlePositions = useRef<Float32Array | null>(null);
  if (!particlePositions.current) {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 12; // X
      arr[i + 1] = (Math.random() - 0.5) * 12; // Y
      arr[i + 2] = (Math.random() - 0.5) * 12; // Z
    }
    particlePositions.current = arr;
  }

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#F5E6A8" />
      <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#00C896" />
      <spotLight position={[0, 12, 0]} intensity={2.0} color="#D4AF37" angle={0.6} penumbra={0.5} />

      {/* Floating Glass Crystal */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={crystalRef} castShadow receiveShadow>
          <octahedronGeometry args={[2, 0]} />
          <meshPhysicalMaterial
            color="#D4AF37"
            metalness={0.15}
            roughness={0.08}
            transmission={0.85}
            thickness={1.5}
            ior={1.6}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            attenuationColor="#F5E6A8"
            attenuationDistance={1}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      {/* Orbiting thin Gold Ring */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <mesh ref={ringRef}>
          <torusGeometry args={[3.2, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>

      {/* Background Gold Dust Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions.current, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#F5E6A8"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-80">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <HeroVisuals />
      </Canvas>
    </div>
  );
}
