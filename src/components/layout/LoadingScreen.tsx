"use client";

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoPathRef = useRef<SVGPathElement>(null);
  const logoPath2Ref = useRef<SVGPathElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. Progress Simulation
    const duration = 2400; // 2.4 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const nextProgress = Math.min(Math.round((step / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress === 100) {
        clearInterval(timer);
        
        // Premium shutter/slit exit transition
        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          }
        });

        tl.to(".loading-ui", {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.in"
        })
        .to(containerRef.current, {
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
          duration: 1.0,
          ease: "power4.inOut"
        }, "-=0.2");
      }
    }, intervalTime);

    // 2. SVG Path Drawing
    if (logoPathRef.current && logoPath2Ref.current) {
      const length1 = logoPathRef.current.getTotalLength();
      const length2 = logoPath2Ref.current.getTotalLength();
      
      gsap.set(logoPathRef.current, { strokeDasharray: length1, strokeDashoffset: length1 });
      gsap.set(logoPath2Ref.current, { strokeDasharray: length2, strokeDashoffset: length2 });

      gsap.timeline()
        .to(logoPathRef.current, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" })
        .to(logoPath2Ref.current, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, "-=1.5");
    }

    // 3. Canvas particle setup
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const particles: Array<{
          x: number;
          y: number;
          radius: number;
          vy: number;
          vx: number;
          alpha: number;
          active: boolean;
        }> = [];

        // Seed particles
        for (let i = 0; i < 45; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            radius: Math.random() * 2 + 0.5,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -Math.random() * 0.6 - 0.2, // always floating up
            alpha: Math.random() * 0.6 + 0.2,
            active: true
          });
        }

        let animationFrame: number;
        const render = () => {
          ctx.fillStyle = '#050505';
          ctx.fillRect(0, 0, w, h);

          // Soft central gold radial light
          const radGrd = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, Math.max(w, h) * 0.5);
          radGrd.addColorStop(0, 'rgba(212, 175, 55, 0.06)');
          radGrd.addColorStop(0.5, 'rgba(0, 200, 150, 0.01)'); // touch of emerald
          radGrd.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = radGrd;
          ctx.fillRect(0, 0, w, h);

          // Update and draw particles
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#D4AF37';
          particles.forEach((p) => {
            p.y += p.vy;
            p.x += p.vx;
            
            // Loop particles back from bottom if they exit top
            if (p.y < -10) {
              p.y = h + 10;
              p.x = Math.random() * w;
            }
            if (p.x < -10 || p.x > w + 10) {
              p.vx *= -1;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 230, 168, ${p.alpha})`;
            ctx.fill();
          });
          ctx.shadowBlur = 0;

          animationFrame = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
          w = canvas.width = window.innerWidth;
          h = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
          cancelAnimationFrame(animationFrame);
          window.removeEventListener('resize', handleResize);
        };
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-50 overflow-hidden select-none bg-bg-primary"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      
      {/* UI Details */}
      <div className="loading-ui absolute inset-0 flex flex-col justify-center items-center z-10 px-6">
        {/* Monogram SVG */}
        <div className="relative mb-8 w-24 h-24 flex items-center justify-center">
          {/* Subtle spinning glow ring */}
          <div className="absolute inset-0 rounded-full border border-gold-champagne/15 animate-spin" style={{ animationDuration: '10s' }} />
          <div className="absolute inset-2 rounded-full border border-dashed border-emerald-mint/10 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          
          <svg
            className="w-16 h-16 relative z-10"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Draw letter N */}
            <path
              ref={logoPathRef}
              d="M 25 75 L 25 25 L 75 75 L 75 25"
              stroke="#D4AF37"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Emerald underline slash */}
            <path
              ref={logoPath2Ref}
              d="M 15 85 L 85 85"
              stroke="#00C896"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Operating System System Info */}
        <div className="font-mono text-center tracking-widest text-[10px] text-text-muted uppercase mb-2">
          System Initializing ...
        </div>

        {/* Big Progress Counter */}
        <div className="font-display font-light text-5xl md:text-6xl text-white tracking-tighter mb-8">
          {progress.toString().padStart(3, '0')}<span className="text-gold-champagne text-2xl">%</span>
        </div>

        {/* Frosted loading slider bar */}
        <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-champagne to-emerald-mint transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Frame overlays for high-end feel */}
      <div className="absolute top-8 left-8 font-mono text-[9px] text-text-muted tracking-widest uppercase hidden md:block">
        Naveenkumar D // Portfolio v3.0
      </div>
      <div className="absolute bottom-8 left-8 font-mono text-[9px] text-text-muted tracking-widest uppercase hidden md:block">
        Workspace: C:\Users\Naveen\portfolio
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[9px] text-text-muted tracking-widest uppercase hidden md:block">
        Core: Next.js + ThreeJS + GSAP
      </div>
    </div>
  );
}
