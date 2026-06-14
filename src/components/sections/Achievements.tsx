"use client";

import { motion, Variants } from 'framer-motion';
import { ACHIEVEMENTS } from '@/utils/data';
import { Award, Compass, Shield } from 'lucide-react';

export default function Achievements() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section
      id="achievements"
      className="relative min-h-screen w-full bg-bg-secondary py-28 px-6 md:px-12 flex items-center"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="w-full max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="mb-20 text-center">
          <div className="font-mono text-[10px] text-gold-champagne tracking-widest uppercase mb-2">
            05 // Distinctions
          </div>
          <h3 className="font-display font-light text-3xl md:text-5xl text-white tracking-tight">
            Awards &amp; <span className="font-serif italic text-gold-glow">Achievements</span>.
          </h3>
          <p className="mt-4 max-w-md mx-auto text-xs md:text-sm text-text-secondary font-light leading-relaxed">
            Honored with placements and recognitions across technical expos and cryptographic paper presentations.
          </p>
        </div>

        {/* Plaques Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {ACHIEVEMENTS.map((ach) => (
            <motion.div
              key={ach.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-panel-gold rounded-2xl p-6 md:p-8 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Light sweep sweep overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />

              <div>
                {/* Award Badge Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gold-champagne/10 border border-gold-champagne/25 flex items-center justify-center text-gold-champagne shadow-md shadow-gold-champagne/5">
                      <Award className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-base tracking-wide">
                        {ach.place}
                      </h4>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-gold-glow">
                        {ach.title}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest">
                    Symposium Placement
                  </span>
                </div>

                {/* Event Title */}
                <h5 className="font-display font-semibold text-sm text-white tracking-wide mb-3">
                  {ach.event}
                </h5>

                {/* Event Description */}
                <p className="text-xs text-text-secondary font-light leading-relaxed">
                  {ach.description}
                </p>
              </div>

              {/* Decorative subtle technology lines */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[8px] tracking-widest text-text-muted uppercase">
                <span>Verification ID // AACH-{ach.id.toUpperCase()}</span>
                <span>Active Status</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
