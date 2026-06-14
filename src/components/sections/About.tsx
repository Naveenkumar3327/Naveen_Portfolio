"use client";

import dynamic from 'next/dynamic';
import { motion, Variants } from 'framer-motion';
import { PERSONAL_INFO } from '@/utils/data';
import { GraduationCap, Award, Compass, Briefcase } from 'lucide-react';

const ProfileCard3D = dynamic(() => import('@/components/3d/ProfileCard3D'), { ssr: false });

export default function About() {
  const scrollVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-bg-secondary py-28 px-6 md:px-12 flex items-center"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={scrollVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left: 3D Profile Card */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Subtle glow sphere behind card */}
            <div className="absolute w-[250px] h-[250px] bg-gold-champagne/5 rounded-full filter blur-[80px]" />
            <ProfileCard3D />
          </div>

          {/* Right: Storytelling Info */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Section Tag */}
            <div className="font-mono text-[10px] text-gold-champagne tracking-widest uppercase mb-2">
              01 // The Story
            </div>
            
            {/* Section Header */}
            <h3 className="font-display font-light text-3xl md:text-5xl text-white tracking-tight mb-8">
              A Fusion of <span className="font-serif italic text-gold-glow">Design</span> and <span className="font-serif italic text-emerald-glow">Code</span>.
            </h3>

            {/* Story Bio */}
            <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed mb-8">
              Hi, I&apos;m <span className="text-white font-medium">{PERSONAL_INFO.name}</span>, a student at <span className="text-white">{PERSONAL_INFO.education}</span>. I build next-generation web applications. My professional trajectory ranges from drafting cloud-ready backend services to detailing premium, interactive frontends.
            </p>

            {/* Feature stats blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1: Education */}
              <div className="glass-panel p-5 rounded-2xl flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-gold-champagne/10 border border-gold-champagne/20 text-gold-champagne mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-white text-sm font-semibold tracking-wide mb-1">Education</h4>
                  <p className="text-xs text-text-secondary leading-normal mb-1">{PERSONAL_INFO.education}</p>
                  <p className="font-mono text-[9px] text-text-muted">B.E. Computer Science</p>
                </div>
              </div>

              {/* Card 2: Mission */}
              <div className="glass-panel p-5 rounded-2xl flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-mint/10 border border-emerald-mint/20 text-emerald-glow mt-0.5">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-white text-sm font-semibold tracking-wide mb-1">Developer Mission</h4>
                  <p className="text-xs text-text-secondary leading-normal">
                    To build meaningful, highly scalable, and visually exceptional digital experiences.
                  </p>
                </div>
              </div>

              {/* Card 3: Experience Summary */}
              <div className="glass-panel p-5 rounded-2xl flex items-start gap-4 sm:col-span-2">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white mt-0.5">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-white text-sm font-semibold tracking-wide mb-1.5">Employment Roles</h4>
                  <div className="flex flex-wrap gap-2 md:gap-x-4">
                    <span className="font-mono text-[10px] text-text-secondary">
                      💻 Agro Nanba <span className="text-text-muted">(Web Dev)</span>
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="font-mono text-[10px] text-text-secondary">
                      🛠 SRKV PTC <span className="text-text-muted">(Freelancer)</span>
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="font-mono text-[10px] text-text-secondary">
                      🦊 Shadow Fox <span className="text-text-muted">(Intern)</span>
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="font-mono text-[10px] text-text-secondary">
                      🔒 Appin Tech <span className="text-text-muted">(Intern)</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
