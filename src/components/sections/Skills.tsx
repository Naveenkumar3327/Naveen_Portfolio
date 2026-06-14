"use client";

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const SkillsGalaxy = dynamic(() => import('@/components/3d/SkillsGalaxy'), { ssr: false });

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen w-full bg-bg-primary py-28 px-6 md:px-12 flex items-center"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="w-full max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center lg:text-left"
        >
          <div className="font-mono text-[10px] text-gold-champagne tracking-widest uppercase mb-2">
            02 // Specialty Matrix
          </div>
          <h3 className="font-display font-light text-3xl md:text-5xl text-white tracking-tight">
            The Interactive <span className="font-serif italic text-gold-glow">Skills</span> Galaxy.
          </h3>
          <p className="mt-4 max-w-lg text-xs md:text-sm text-text-secondary font-light leading-relaxed">
            Drag to pan the 3D orbital space and select planet nodes to view technical proficiencies across programming languages, database architectures, and cloud services.
          </p>
        </motion.div>

        {/* 3D Skills Galaxy Canvas */}
        <div className="w-full">
          <SkillsGalaxy />
        </div>
      </div>
    </section>
  );
}
