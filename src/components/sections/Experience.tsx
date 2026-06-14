"use client";

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { EXPERIENCES } from '@/utils/data';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position inside this timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Smooth scroll progression line
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen w-full bg-bg-secondary py-28 px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="w-full max-w-5xl mx-auto relative">
        {/* Section Heading */}
        <div className="mb-20 text-center">
          <div className="font-mono text-[10px] text-gold-champagne tracking-widest uppercase mb-2">
            03 // The Chronicle
          </div>
          <h3 className="font-display font-light text-3xl md:text-5xl text-white tracking-tight">
            Professional <span className="font-serif italic text-gold-glow">Timeline</span>.
          </h3>
          <p className="mt-4 max-w-md mx-auto text-xs md:text-sm text-text-secondary font-light leading-relaxed">
            A linear progression of technical development, engineering internships, and full-stack deployments.
          </p>
        </div>

        {/* Timeline Path Overlay */}
        <div className="absolute left-4 md:left-1/2 top-[180px] bottom-10 w-[2px] -translate-x-1/2 bg-white/5 pointer-events-none rounded-full overflow-hidden">
          {/* Dynamic drawing path line */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="w-full h-full bg-gradient-to-b from-gold-champagne via-gold-glow to-emerald-mint"
          />
        </div>

        {/* Timeline Cards */}
        <div className="space-y-16 relative z-10">
          {EXPERIENCES.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={exp.id}
                className={`flex flex-col md:flex-row w-full ${
                  isEven ? 'md:justify-start' : 'md:justify-end'
                } items-start relative`}
              >
                {/* Center Node Indicator */}
                <div
                  className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full border border-gold-champagne bg-bg-primary flex items-center justify-center z-20 shadow-lg shadow-gold-champagne/20"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-champagne animate-pulse" />
                </div>

                {/* Timeline Card Wrapper */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`w-full md:w-[45%] ml-10 md:ml-0 ${
                    isEven ? 'md:text-right' : 'md:text-left'
                  }`}
                >
                  <div className="glass-panel-gold p-6 md:p-8 rounded-2xl relative overflow-hidden group">
                    {/* Light sweep indicator */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />

                    {/* Timeline Date & Type */}
                    <div className={`flex items-center gap-3 mb-3 font-mono text-[9px] uppercase tracking-wider text-gold-glow ${
                      isEven ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                      <span className="px-2 py-0.5 rounded border border-gold-champagne/20 bg-gold-champagne/5">
                        {exp.duration}
                      </span>
                      <span className="text-text-muted">•</span>
                      <span className="text-emerald-glow">{exp.type}</span>
                    </div>

                    {/* Role / Title */}
                    <h4 className="font-display font-semibold text-lg md:text-xl text-white tracking-wide mb-1">
                      {exp.role}
                    </h4>

                    {/* Company */}
                    <h5 className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-5 flex items-center gap-1.5 justify-start is-even:md:justify-end">
                      <Briefcase className="w-3.5 h-3.5 text-gold-champagne" />
                      <span>{exp.company}</span>
                    </h5>

                    {/* Points details list */}
                    <ul className={`space-y-2.5 text-xs text-text-secondary font-light leading-relaxed text-left ${
                      isEven ? 'md:text-right md:list-none' : 'md:list-none'
                    }`}>
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex gap-2 items-start justify-start is-even:md:justify-end">
                          <span className={`text-gold-champagne mt-1 ${isEven ? 'md:order-2' : ''}`}>›</span>
                          <span className={isEven ? 'md:order-1' : ''}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
