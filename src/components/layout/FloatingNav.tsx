"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Cpu, Briefcase, FolderGit2, Award, GraduationCap, Mail, Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '@/utils/data';

const NAV_ITEMS = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Cpu },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: FolderGit2 },
  { label: "Achievements", href: "#achievements", icon: Award },
  { label: "Certifications", href: "#certifications", icon: GraduationCap },
  { label: "Contact", href: "#contact", icon: Mail }
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Active section tracking with IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // triggers when section is in middle viewport
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    NAV_ITEMS.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Update hash in URL
      window.history.pushState(null, '', href);
    }
  };

  return (
    <>
      {/* DESKTOP SIDE NAV (Vertical Hover-to-Reveal) */}
      <motion.nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ width: isHovered ? 185 : 56 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center py-6 rounded-2xl glass-panel-gold overflow-hidden"
        style={{ height: "auto" }}
      >
        {/* Monogram branding */}
        <div className="mb-4 flex items-center justify-center w-8 h-8 rounded-full border border-gold-champagne/20 text-gold-champagne font-serif text-base font-bold select-none">
          N
        </div>
        <div className="w-8 h-[1px] bg-gold-champagne/10 mb-4" />

        {/* Links */}
        <div className="flex flex-col gap-1 w-full px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isSelfActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`relative flex items-center h-10 w-full rounded-xl transition-all duration-300 cursor-pointer ${
                  isSelfActive
                    ? "text-gold-champagne font-semibold bg-gold-champagne/5"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary/40"
                }`}
                style={{ paddingLeft: '10px' }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.15 }}
                      className="ml-3 font-mono text-[9px] uppercase tracking-widest select-none whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active slider indicator line on the right side */}
                {isSelfActive && (
                  <motion.div
                    layoutId="activeSideNav"
                    className="absolute right-0 w-[3px] h-6 bg-gold-champagne rounded-l-md"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </a>
            );
          })}
        </div>
      </motion.nav>

      {/* MOBILE FLOATING HAMBURGER TOGGLE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-40 w-11 h-11 rounded-full glass-panel-gold md:hidden flex items-center justify-center text-text-primary shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
      >
        {isOpen ? <X className="w-5 h-5 text-gold-champagne" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* MOBILE NAV DRAWER (Folds Automatically on Link Selection) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-35 bg-black/20 backdrop-blur-sm md:hidden"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-40 w-64 bg-bg-secondary/95 backdrop-blur-xl border-l border-white/5 p-8 flex flex-col justify-between shadow-2xl md:hidden"
            >
              <div>
                {/* Monogram / Header */}
                <div className="flex items-center justify-between mb-12">
                  <div className="font-display font-bold text-sm tracking-wider text-text-primary flex items-center gap-2">
                    <span className="text-gold-champagne font-serif text-lg">N</span>
                    <span className="font-light text-[10px] tracking-widest uppercase">Naveenkumar</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-text-secondary hover:text-text-primary cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer links */}
                <div className="flex flex-col gap-2">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isSelfActive = activeSection === item.href.slice(1);
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          handleClick(e, item.href);
                          setIsOpen(false); // Folds/closes automatically!
                        }}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                          isSelfActive
                            ? "bg-gold-champagne/10 border border-gold-champagne/20 text-gold-champagne font-semibold"
                            : "text-text-secondary hover:text-text-primary hover:bg-bg-primary/50"
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="font-mono text-xs uppercase tracking-wider">
                          {item.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Footer contact */}
              <div className="font-mono text-[9px] text-text-muted select-none uppercase tracking-widest text-center">
                {PERSONAL_INFO.email}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
