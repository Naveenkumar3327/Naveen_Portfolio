"use client";

import { motion } from 'framer-motion';

// Types for skills items
interface SkillItem {
  name: string;
  glowClass: string;
  icon: (className: string) => React.ReactNode;
}

const ROW1_SKILLS: SkillItem[] = [
  {
    name: "React",
    glowClass: "hover:shadow-[0_0_25px_rgba(6,182,212,0.18)] hover:border-cyan-500/25 hover:text-cyan-500",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    name: "Next.js",
    glowClass: "hover:shadow-[0_0_25px_rgba(99,102,241,0.18)] hover:border-indigo-500/25 hover:text-indigo-600",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M7 16V8l10 8V8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: "TypeScript",
    glowClass: "hover:shadow-[0_0_25px_rgba(59,130,246,0.18)] hover:border-blue-500/25 hover:text-blue-600",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 8h6M12 8v9M17 14c0 1.5-.5 2-1.5 2s-1.5-.5-1.5-2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: "HTML5",
    glowClass: "hover:shadow-[0_0_25px_rgba(239,68,68,0.18)] hover:border-red-500/25 hover:text-red-500",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 3h16l-1.5 16-6.5 2.5-6.5-2.5L4 3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 7H8l.5 4h7.5l-.5 4.5-3.5 1-3.5-1-.2-2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: "CSS3",
    glowClass: "hover:shadow-[0_0_25px_rgba(59,130,246,0.18)] hover:border-blue-500/25 hover:text-blue-500",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 3h16l-1.5 16-6.5 2.5-6.5-2.5L4 3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 7H9l-.5 4h5.5l-.5 4.5-3.5 1-3.5-1-.2-2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: "JavaScript",
    glowClass: "hover:shadow-[0_0_25px_rgba(245,158,11,0.18)] hover:border-amber-500/25 hover:text-amber-500",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 15c0 1.5-.5 2-1.5 2s-1.5-.5-1.5-2M15 11v4c0 1 .5 2 1.5 2s1.5-1 1.5-2v-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
    glowClass: "hover:shadow-[0_0_25px_rgba(6,182,212,0.18)] hover:border-cyan-500/25 hover:text-cyan-400",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-1.2 0-2.4.6-3.6 1.8L3 10.2c-1.2 1.2-1.8 2.4-1.8 3.6 0 2.4 1.8 4.2 4.2 4.2 1.2 0 2.4-.6 3.6-1.8l5.4-5.4c1.2-1.2 1.8-2.4 1.8-3.6 0-2.4-1.8-4.2-4.2-4.2z" />
        <path d="M18.6 10.2c-1.2-1.2-2.4-1.8-3.6-1.8-2.4 0-4.2 1.8-4.2 4.2 0 1.2.6 2.4 1.8 3.6l5.4 5.4c1.2 1.2 2.4 1.8 3.6 1.8 2.4 0 4.2-1.8 4.2-4.2 0-1.2-.6-2.4-1.8-3.6l-5.4-5.4z" />
      </svg>
    )
  }
];

const ROW2_SKILLS: SkillItem[] = [
  {
    name: "Node.js",
    glowClass: "hover:shadow-[0_0_25px_rgba(16,185,129,0.18)] hover:border-emerald-500/25 hover:text-emerald-500",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: "Express.js",
    glowClass: "hover:shadow-[0_0_25px_rgba(107,114,128,0.18)] hover:border-gray-500/25 hover:text-gray-600",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 12h10M12 7v10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: "MongoDB",
    glowClass: "hover:shadow-[0_0_25px_rgba(16,185,129,0.18)] hover:border-emerald-600/25 hover:text-emerald-600",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c0 0-6 4.5-6 10c0 3.3 2.7 6 6 6s6-2.7 6-6c0-5.5-6-10-6-10z" />
        <path d="M12 2v16" />
      </svg>
    )
  },
  {
    name: "Java",
    glowClass: "hover:shadow-[0_0_25px_rgba(249,115,22,0.18)] hover:border-orange-500/25 hover:text-orange-500",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <path d="M6 1v3M10 1v3M14 1v3" />
      </svg>
    )
  },
  {
    name: "Python",
    glowClass: "hover:shadow-[0_0_25px_rgba(59,130,246,0.18)] hover:border-blue-500/25 hover:text-blue-500",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 10V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6z" />
        <path d="M12 14v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-6z" />
        <circle cx="7" cy="5" r="0.5" fill="currentColor" />
        <circle cx="17" cy="19" r="0.5" fill="currentColor" />
      </svg>
    )
  },
  {
    name: "AWS",
    glowClass: "hover:shadow-[0_0_25px_rgba(245,158,11,0.18)] hover:border-amber-500/25 hover:text-amber-600",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19A5.5 5.5 0 0 0 18 8h-1.26A8 8 0 1 0 4 15.25" />
        <path d="M8 16l4-4 4 4" />
        <path d="M12 12v9" />
      </svg>
    )
  },
  {
    name: "Firebase",
    glowClass: "hover:shadow-[0_0_25px_rgba(245,158,11,0.18)] hover:border-amber-500/25 hover:text-amber-500",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c0 0-8 6-8 12c0 4.4 3.6 8 8 8s8-3.6 8-8c0-6-8-12-8-12z" />
        <path d="M12 8c0 0-4 3-4 6c0 2.2 1.8 4 4 4s4-1.8 4-4c0-3-4-6-4-6z" />
      </svg>
    )
  },
  {
    name: "Git",
    glowClass: "hover:shadow-[0_0_25px_rgba(239,68,68,0.18)] hover:border-red-500/25 hover:text-red-500",
    icon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M6 9v6" />
        <path d="M9 6h6a3 3 0 0 1 3 3v6" />
      </svg>
    )
  }
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen w-full bg-bg-primary py-28 px-6 md:px-12 flex items-center overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-champagne/10 to-transparent" />

      <div className="w-full max-w-6xl mx-auto z-10">
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
          <h3 className="font-display font-light text-3xl md:text-5xl text-text-primary tracking-tight">
            Core Technical <span className="font-serif italic text-gold-glow">Proficiencies</span>.
          </h3>
          <p className="mt-4 max-w-lg text-xs md:text-sm text-text-secondary font-light leading-relaxed">
            Hover over the floating technologies below to halt the marquee and examine signature stack integrations across web frameworks, programming languages, databases, and infrastructure modules.
          </p>
        </motion.div>

        {/* Dynamic Running / Floating Marquees */}
        <div className="flex flex-col gap-6 w-full">
          {/* Row 1: Left to Right scrolling */}
          <div className="marquee-container w-full">
            <div className="marquee-content">
              {[...ROW1_SKILLS, ...ROW1_SKILLS].map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={`${skill.name}-${index}`}
                    className={`skill-card-float glass-panel px-6 py-4 rounded-2xl flex items-center gap-3.5 select-none hover:scale-105 transition-all duration-300 cursor-pointer ${skill.glowClass}`}
                  >
                    <div className="transition-transform duration-300">
                      {IconComponent("w-6 h-6 transition-transform duration-300")}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary font-medium">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Right to Left scrolling */}
          <div className="marquee-container w-full">
            <div className="marquee-content reverse">
              {[...ROW2_SKILLS, ...ROW2_SKILLS].map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={`${skill.name}-${index}`}
                    className={`skill-card-float glass-panel px-6 py-4 rounded-2xl flex items-center gap-3.5 select-none hover:scale-105 transition-all duration-300 cursor-pointer ${skill.glowClass}`}
                  >
                    <div className="transition-transform duration-300">
                      {IconComponent("w-6 h-6 transition-transform duration-300")}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary font-medium">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
