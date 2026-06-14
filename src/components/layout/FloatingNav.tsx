"use client";

import { useEffect, useState } from 'react';
import gsap from 'gsap';

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" }
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // 1. Scroll check for background fading
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // 2. Active section tracking with IntersectionObserver
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
      window.removeEventListener("scroll", handleScroll);
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

  // Magnetic Hover script for individual links
  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-pill");
    navLinks.forEach((link) => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = link.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;

        gsap.to(link, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(link, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.3)"
        });
      };

      link.addEventListener("mousemove", handleMouseMove);
      link.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        link.removeEventListener("mousemove", handleMouseMove);
        link.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 w-[95%] max-w-4xl ${
        isScrolled ? "scale-98" : "scale-100"
      }`}
    >
      <div
        className={`w-full flex items-center justify-between px-6 py-3.5 rounded-full border transition-all duration-500 ${
          isScrolled
            ? "bg-bg-secondary/70 border-white/5 shadow-2xl backdrop-blur-xl"
            : "bg-white/3 border-white/5 backdrop-blur-md"
        }`}
      >
        {/* Monogram branding */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="font-display font-bold text-sm tracking-wider text-white hover:text-gold-champagne transition-colors duration-300 flex items-center gap-2"
        >
          <span className="text-gold-champagne font-serif text-lg">N</span>
          <span className="hidden sm:inline font-light text-[10px] tracking-widest text-text-secondary uppercase">
            Naveenkumar
          </span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-1 md:gap-2">
          {NAV_ITEMS.map((item) => {
            const isSelfActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`nav-pill relative px-3 py-1.5 rounded-full text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  isSelfActive
                    ? "text-gold-champagne font-semibold"
                    : "text-text-secondary hover:text-white"
                }`}
              >
                {/* Active indicator background highlight pill */}
                {isSelfActive && (
                  <span
                    className="absolute inset-0 bg-white/5 border border-gold-champagne/20 rounded-full -z-10 shadow-lg shadow-gold-champagne/5"
                    style={{ filter: "drop-shadow(0 0 4px rgba(212,175,55,0.1))" }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
