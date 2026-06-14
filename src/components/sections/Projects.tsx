"use client";

import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { PROJECTS, Project } from '@/utils/data';
import { ExternalLink, Layers } from 'lucide-react';

function Github({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}


function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Framer Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="w-full min-h-[350px] rounded-2xl glass-panel-gold p-6 flex flex-col justify-between relative group cursor-pointer transition-all duration-300"
    >
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-gold-champagne/3 rounded-full filter blur-[40px] pointer-events-none group-hover:bg-gold-champagne/8 transition-all duration-300" />
      
      <div style={{ transform: "translateZ(30px)" }}>
        {/* Project Icon */}
        <div className="mb-6 w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-champagne group-hover:border-gold-champagne/30 transition-colors duration-300">
          <Layers className="w-5 h-5" />
        </div>

        {/* Project Title */}
        <h4 className="font-display font-semibold text-lg text-white tracking-tight mb-2.5">
          {project.title}
        </h4>

        {/* Project Description */}
        <p className="text-xs text-text-secondary font-light leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div style={{ transform: "translateZ(20px)" }}>
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded font-mono text-[8px] uppercase tracking-wider bg-white/5 text-text-secondary border border-white/5"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links Footer */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <a
            href={project.gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-text-muted hover:text-white transition-colors duration-300"
          >
            <Github className="w-3.5 h-3.5" />
            Repository
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-gold-champagne hover:text-gold-glow transition-colors duration-300"
          >
            Live Demo
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");

  // Filter categorization mapping
  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "nextjs") return p.tech.includes("Next.js");
    if (filter === "mern") return p.tech.includes("MongoDB") || p.tech.includes("Express.js") || p.tech.includes("React.js");
    if (filter === "python") return p.tech.includes("Python");
    return true;
  });

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full bg-bg-primary py-28 px-6 md:px-12"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="w-full max-w-6xl mx-auto">
        
        {/* Section Heading & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8">
          <div>
            <div className="font-mono text-[10px] text-gold-champagne tracking-widest uppercase mb-2">
              04 // Showcase Portfolio
            </div>
            <h3 className="font-display font-light text-3xl md:text-5xl text-white tracking-tight">
              Crafted <span className="font-serif italic text-gold-glow">Creations</span>.
            </h3>
            <p className="mt-4 max-w-md text-xs md:text-sm text-text-secondary font-light leading-relaxed">
              Exhibiting interactive full-stack systems, dynamic utilities, AI guiding roadmaps, and automation widgets.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-full border border-white/5 bg-bg-secondary/40 backdrop-blur-md self-start lg:self-end">
            {["all", "nextjs", "mern", "python"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  filter === category
                    ? "bg-gold-champagne text-bg-primary font-bold shadow-lg shadow-gold-champagne/10"
                    : "text-text-secondary hover:text-white"
                }`}
              >
                {category === "all" ? "All Projects" : category === "nextjs" ? "Next.js" : category === "mern" ? "MERN Stack" : "Python & AI"}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
