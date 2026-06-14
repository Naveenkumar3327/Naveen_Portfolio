"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor in desktop
    if (window.innerWidth >= 768) {
      document.body.style.cursor = 'none';
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial coordinates
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3.out" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleLinkHover = () => {
      gsap.to(dot, { scale: 2, backgroundColor: "#00C896", duration: 0.2 });
      gsap.to(ring, { scale: 1.6, borderColor: "#00C896", borderWidth: "1.5px", duration: 0.2 });
    };

    const handleLinkUnhover = () => {
      gsap.to(dot, { scale: 1, backgroundColor: "#D4AF37", duration: 0.2 });
      gsap.to(ring, { scale: 1, borderColor: "rgba(212, 175, 55, 0.4)", borderWidth: "1px", duration: 0.2 });
    };

    // Attach listeners recursively to capture dynamically loaded elements
    const attachListeners = () => {
      const links = document.querySelectorAll("a, button, [role='button'], .hover-target");
      links.forEach(link => {
        link.removeEventListener("mouseenter", handleLinkHover);
        link.removeEventListener("mouseleave", handleLinkUnhover);
        link.addEventListener("mouseenter", handleLinkHover);
        link.addEventListener("mouseleave", handleLinkUnhover);
      });
    };

    attachListeners();
    const interval = setInterval(attachListeners, 1500);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-50 bg-gold-champagne hidden md:block mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold-champagne/40 pointer-events-none z-50 hidden md:block mix-blend-difference"
      />
    </>
  );
}
