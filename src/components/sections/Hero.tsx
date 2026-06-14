"use client";

import dynamic from 'next/dynamic';
import { motion, Variants } from 'framer-motion';
import { PERSONAL_INFO } from '@/utils/data';
import { ArrowRight, Download, Mail } from 'lucide-react';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), { ssr: false });

export default function Hero() {
  // Animation configs for text elements
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-bg-primary py-20 px-6"
    >
      {/* 3D WebGL Background Scene */}
      <HeroScene />

      {/* Floating subtle glow spheres in CSS for ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-gold-champagne/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-emerald-mint/3 filter blur-[100px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Logo Pill badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 px-4 py-1.5 rounded-full border border-gold-champagne/15 bg-white/3 backdrop-blur-md flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-mint animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-gold-glow">
              Available for Global Collaborations
            </span>
          </motion.div>

          {/* Core Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-light text-5xl md:text-8xl text-white tracking-tighter mb-4 select-none"
          >
            Naveenkumar <span className="text-shimmer font-semibold font-serif font-display">D</span>
          </motion.h1>

          {/* Titles */}
          <motion.h2
            variants={itemVariants}
            className="font-mono text-xs md:text-sm tracking-widest text-text-secondary uppercase mb-8 flex flex-wrap gap-x-3 gap-y-1 justify-center"
          >
            <span>{PERSONAL_INFO.title}</span>
            <span className="text-gold-champagne">//</span>
            <span className="text-emerald-glow">{PERSONAL_INFO.subtitle}</span>
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-sm md:text-base text-text-secondary font-light leading-relaxed mb-12"
          >
            {PERSONAL_INFO.tagline}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo("#projects")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-champagne to-gold-glow text-bg-primary text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-gold-champagne/30 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Explore My Work
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/10 bg-white/3 backdrop-blur-md text-white text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 hover:border-gold-champagne/30 hover:bg-white/5 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Contact Me
              <Mail className="w-3.5 h-3.5 text-gold-champagne" />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/10 bg-white/3 backdrop-blur-md text-white text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 hover:border-emerald-mint/30 hover:bg-white/5 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Github Profile
              <Download className="w-3.5 h-3.5 text-emerald-glow" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated scroll down cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50 select-none">
        <span className="font-mono text-[8px] uppercase tracking-widest text-text-muted">Scroll Down</span>
        <div className="w-[1.5px] h-10 bg-white/5 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gold-champagne rounded-full animate-bounce" style={{ animationDuration: '2s' }} />
        </div>
      </div>
    </section>
  );
}
