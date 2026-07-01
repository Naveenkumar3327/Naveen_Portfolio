"use client";

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { SKILLS_DATA, SkillNode } from '@/utils/data';

function GalaxyCore({ activeSkill, hoveredSkill, onHover, onClick }: {
  activeSkill: SkillNode | null;
  hoveredSkill: string | null;
  onHover: (name: string | null) => void;
  onClick: (skill: SkillNode) => void;
}) {
  const coreRef = useRef<THREE.Group>(null);
  const orbit1Ref = useRef<THREE.Group>(null);
  const orbit2Ref = useRef<THREE.Group>(null);
  const orbit3Ref = useRef<THREE.Group>(null);

  // Rotate each orbit group at a unique speed
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.15;
    }
    if (orbit1Ref.current) {
      orbit1Ref.current.rotation.y = time * 0.08;
    }
    if (orbit2Ref.current) {
      orbit2Ref.current.rotation.y = -time * 0.05;
    }
    if (orbit3Ref.current) {
      orbit3Ref.current.rotation.y = time * 0.03;
    }
  });

  // Filter skills by category
  const frontendSkills = SKILLS_DATA.filter((s) => s.category === 'frontend');
  const backendSkills = SKILLS_DATA.filter((s) => s.category === 'backend' || s.category === 'database');
  const cloudSkills = SKILLS_DATA.filter((s) => s.category === 'cloud' || s.category === 'programming');

  const coreSkill = SKILLS_DATA.find((s) => s.category === 'core') || { name: 'Naveenkumar', category: 'core', level: 100 } as SkillNode;

  return (
    <group>
      {/* Center Core node */}
      <group ref={coreRef}>
        <mesh onClick={() => onClick(coreSkill)}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#6366f1" />
        </mesh>
        <Html distanceFactor={8} center position={[0, 0, 0]}>
          <div className="px-4 py-2 rounded-full border border-gold-champagne/30 bg-bg-primary/95 text-gold-champagne font-display font-semibold text-[11px] tracking-widest uppercase shadow-2xl shadow-gold-champagne/15 select-none whitespace-nowrap animate-pulse">
            Naveen D
          </div>
        </Html>
      </group>

      {/* Orbit 1: Frontend (Radius 2.5) */}
      <group ref={orbit1Ref}>
        {/* Draw thin orbital path */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.5, 2.52, 64]} />
          <meshBasicMaterial color="rgba(99, 102, 241, 0.12)" side={THREE.DoubleSide} />
        </mesh>

        {frontendSkills.map((skill, index) => {
          const angle = (index / frontendSkills.length) * Math.PI * 2;
          const radius = 2.5;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const isSelected = activeSkill?.name === skill.name;
          const isHovered = hoveredSkill === skill.name;

          return (
            <group key={skill.name} position={[x, 0, z]}>
              <mesh
                onClick={() => onClick(skill)}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  onHover(skill.name);
                }}
                onPointerOut={() => onHover(null)}
              >
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshBasicMaterial color={isSelected || isHovered ? "#0d9488" : "rgba(99, 102, 241, 0.7)"} />
              </mesh>
              <Html distanceFactor={7} center position={[0, 0.25, 0]}>
                <button
                  onClick={() => onClick(skill)}
                  onMouseEnter={() => onHover(skill.name)}
                  onMouseLeave={() => onHover(null)}
                  className={`px-2 py-1 rounded border font-mono text-[9px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected || isHovered
                      ? "border-emerald-mint bg-emerald-mint/20 text-emerald-glow scale-105 shadow-glow"
                      : "border-white/10 bg-bg-secondary/95 text-text-secondary hover:border-gold-champagne/50 hover:text-white"
                  }`}
                >
                  {skill.name}
                </button>
              </Html>
            </group>
          );
        })}
      </group>

      {/* Orbit 2: Backend & Database (Radius 4.2) */}
      <group ref={orbit2Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.2, 4.22, 64]} />
          <meshBasicMaterial color="rgba(13, 148, 136, 0.12)" side={THREE.DoubleSide} />
        </mesh>

        {backendSkills.map((skill, index) => {
          const angle = (index / backendSkills.length) * Math.PI * 2;
          const radius = 4.2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const isSelected = activeSkill?.name === skill.name;
          const isHovered = hoveredSkill === skill.name;

          return (
            <group key={skill.name} position={[x, 0, z]}>
              <mesh
                onClick={() => onClick(skill)}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  onHover(skill.name);
                }}
                onPointerOut={() => onHover(null)}
              >
                <sphereGeometry args={[0.14, 16, 16]} />
                <meshBasicMaterial color={isSelected || isHovered ? "#a5b4fc" : "rgba(13, 148, 136, 0.7)"} />
              </mesh>
              <Html distanceFactor={8} center position={[0, 0.25, 0]}>
                <button
                  onClick={() => onClick(skill)}
                  onMouseEnter={() => onHover(skill.name)}
                  onMouseLeave={() => onHover(null)}
                  className={`px-2 py-1 rounded border font-mono text-[9px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected || isHovered
                      ? "border-gold-champagne bg-gold-champagne/20 text-gold-glow scale-105 shadow-glow"
                      : "border-white/10 bg-bg-secondary/95 text-text-secondary hover:border-emerald-mint/50 hover:text-white"
                  }`}
                >
                  {skill.name}
                </button>
              </Html>
            </group>
          );
        })}
      </group>

      {/* Orbit 3: Cloud & Programming (Radius 5.8) */}
      <group ref={orbit3Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[5.8, 5.82, 64]} />
          <meshBasicMaterial color="rgba(15, 23, 42, 0.08)" side={THREE.DoubleSide} />
        </mesh>

        {cloudSkills.map((skill, index) => {
          const angle = (index / cloudSkills.length) * Math.PI * 2;
          const radius = 5.8;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const isSelected = activeSkill?.name === skill.name;
          const isHovered = hoveredSkill === skill.name;

          return (
            <group key={skill.name} position={[x, 0, z]}>
              <mesh
                onClick={() => onClick(skill)}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  onHover(skill.name);
                }}
                onPointerOut={() => onHover(null)}
              >
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshBasicMaterial color={isSelected || isHovered ? "#0d9488" : "rgba(15, 23, 42, 0.4)"} />
              </mesh>
              <Html distanceFactor={9} center position={[0, 0.25, 0]}>
                <button
                  onClick={() => onClick(skill)}
                  onMouseEnter={() => onHover(skill.name)}
                  onMouseLeave={() => onHover(null)}
                  className={`px-2 py-1 rounded border font-mono text-[9px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected || isHovered
                      ? "border-emerald-mint bg-emerald-mint/20 text-emerald-glow scale-105 shadow-glow"
                      : "border-white/10 bg-bg-secondary/95 text-text-secondary hover:border-white/50 hover:text-white"
                  }`}
                >
                  {skill.name}
                </button>
              </Html>
            </group>
          );
        })}
      </group>
    </group>
  );
}

export default function SkillsGalaxy() {
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Set default active skill to core
  useEffect(() => {
    const core = SKILLS_DATA.find(s => s.category === 'core');
    if (core) setActiveSkill(core);
  }, []);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8 items-center min-h-[500px]">
      {/* 3D Viewport - 3 parts width */}
      <div className="lg:col-span-3 h-[400px] md:h-[500px] border border-white/5 rounded-2xl bg-bg-secondary/40 backdrop-blur-md overflow-hidden relative">
        
        {/* Helper overlay */}
        <div className="absolute top-4 left-4 z-10 font-mono text-[9px] tracking-widest text-text-muted uppercase pointer-events-none select-none">
          Use Mouse to Drag & Rotate the Skill Universe
        </div>
        
        <Canvas
          camera={{ position: [0, 6, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 4}
          />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color="#6366f1" />
          <pointLight position={[-5, 5, -5]} intensity={1.0} color="#06b6d4" />
          
          <GalaxyCore
            activeSkill={activeSkill}
            hoveredSkill={hoveredSkill}
            onHover={setHoveredSkill}
            onClick={setActiveSkill}
          />
        </Canvas>
      </div>

      {/* Info Card - 1 part width */}
      <div className="lg:col-span-1 h-full flex items-center">
        <div className="w-full glass-panel-gold p-6 rounded-2xl flex flex-col justify-between min-h-[220px]">
          {activeSkill ? (
            <div>
              <div className="font-mono text-[9px] text-gold-champagne tracking-widest uppercase mb-1">
                {activeSkill.category} Planet
              </div>
              <h4 className="font-display font-semibold text-2xl text-white tracking-tight mb-4 flex items-center gap-2">
                {activeSkill.name}
              </h4>
              
              <div className="mb-4">
                <div className="flex justify-between font-mono text-[10px] text-text-secondary uppercase tracking-widest mb-1.5">
                  <span>Proficiency</span>
                  <span>{activeSkill.level}%</span>
                </div>
                <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-champagne to-emerald-mint transition-all duration-1000 ease-out"
                    style={{ width: `${activeSkill.level}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed">
                {activeSkill.category === 'core'
                  ? "Select skill planets inside the orbiting universe to display developer specialization details and proficiency metrics."
                  : `Demonstrated technical skill implementing ${activeSkill.name} in scalable full-stack applications and development environments.`}
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xs text-text-muted">Click a skill planet node in the 3D galaxy universe to analyze proficiency details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
