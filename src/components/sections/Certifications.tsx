"use client";

import { motion, Variants } from 'framer-motion';
import { CERTIFICATIONS } from '@/utils/data';
import { ShieldAlert, CheckCircle2, Cpu } from 'lucide-react';

export default function Certifications() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section
      id="certifications"
      className="relative min-h-screen w-full bg-bg-primary py-28 px-6 md:px-12 flex items-center"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Futuristic Background overlay grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-20" />

      <div className="w-full max-w-5xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="mb-20 text-center">
          <div className="font-mono text-[10px] text-gold-champagne tracking-widest uppercase mb-2">
            06 // Verified Credentials
          </div>
          <h3 className="font-display font-light text-3xl md:text-5xl text-white tracking-tight">
            Holographic <span className="font-serif italic text-gold-glow">Certifications</span>.
          </h3>
          <p className="mt-4 max-w-md mx-auto text-xs md:text-sm text-text-secondary font-light leading-relaxed">
            Standard authorizations and technical credentials representing professional capabilities.
          </p>
        </div>

        {/* Holograms Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, rotateY: 3, rotateX: -3 }}
              style={{ perspective: 1000 }}
              className="glass-panel p-6 rounded-2xl relative overflow-hidden group border border-white/5 hover:border-emerald-mint/20 transition-all duration-300"
            >
              {/* Scanline grid texture inside the card */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,150,0.015)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-80" />

              {/* Glowing aura under card */}
              <div
                className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full filter blur-[40px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                style={{ backgroundColor: cert.glowColor }}
              />

              {/* Hologram details */}
              <div className="relative z-10">
                
                {/* Stamp header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-widest text-emerald-glow bg-emerald-mint/10 border border-emerald-mint/20 rounded px-2 py-0.5 uppercase">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Node</span>
                  </div>
                  <Cpu className="w-4 h-4 text-text-muted animate-spin" style={{ animationDuration: '8s' }} />
                </div>

                {/* Certificate Name */}
                <h4 className="font-display font-semibold text-base text-white tracking-wide mb-2 group-hover:text-gold-champagne transition-colors duration-300">
                  {cert.title}
                </h4>

                {/* Issuer */}
                <p className="font-mono text-xs text-text-secondary mb-8">
                  Issued by: {cert.issuer}
                </p>

                {/* Footer details */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[8px] tracking-widest text-text-muted uppercase">
                  <span>Year: {cert.year}</span>
                  <span>ID: CERT-{cert.id.slice(5).toUpperCase()}</span>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
