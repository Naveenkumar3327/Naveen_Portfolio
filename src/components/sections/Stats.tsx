"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MOCK_STATS } from '@/utils/data';
import { Code, FolderGit2, BookOpen, Award, GraduationCap } from 'lucide-react';

function Github({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}


function Counter({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMs = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMs / end), 15);
    const steps = totalMs / stepTime;
    const increment = Math.ceil(end / steps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Stats() {
  const [gitStats, setGitStats] = useState({ repos: MOCK_STATS.projectsCompleted, contributions: MOCK_STATS.githubContributions });
  const [lcStats, setLcStats] = useState({ solved: MOCK_STATS.leetcodeProblemsSolved });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const [gitRes, lcRes] = await Promise.all([
          fetch('/api/github'),
          fetch('/api/leetcode')
        ]);
        if (gitRes.ok) {
          const gData = await gitRes.json();
          if (gData.success) {
            setGitStats({
              repos: gData.public_repos,
              contributions: gData.contributions
            });
          }
        }
        if (lcRes.ok) {
          const lData = await lcRes.json();
          if (lData.success) {
            setLcStats({
              solved: lData.solved
            });
          }
        }
      } catch (e) {
        console.warn("Using offline fallback numbers for developer stats.");
      } finally {
        setLoading(false);
      }
    };
    fetchApiData();
  }, []);

  const statsList = [
    {
      label: "GitHub Contributions",
      value: gitStats.contributions,
      icon: <Github className="w-5 h-5 text-gold-champagne" />,
      color: "gold"
    },
    {
      label: "LeetCode Solved",
      value: lcStats.solved,
      icon: <Code className="w-5 h-5 text-emerald-glow" />,
      color: "emerald"
    },
    {
      label: "Projects Completed",
      value: MOCK_STATS.projectsCompleted,
      icon: <FolderGit2 className="w-5 h-5 text-gold-champagne" />,
      color: "gold"
    },
    {
      label: "Certifications Earned",
      value: MOCK_STATS.certificationsEarned,
      icon: <Award className="w-5 h-5 text-emerald-glow" />,
      color: "emerald"
    },
    {
      label: "Technologies Mastered",
      value: MOCK_STATS.technologiesMastered,
      icon: <BookOpen className="w-5 h-5 text-gold-champagne" />,
      color: "gold"
    },
    {
      label: "Years of Learning",
      value: MOCK_STATS.yearsOfLearning,
      icon: <GraduationCap className="w-5 h-5 text-emerald-glow" />,
      color: "emerald"
    }
  ];

  return (
    <section
      id="stats"
      className="relative min-h-[60vh] w-full bg-bg-secondary py-28 px-6 md:px-12 flex items-center"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="w-full max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="mb-20 text-center">
          <div className="font-mono text-[10px] text-gold-champagne tracking-widest uppercase mb-2">
            07 // Real-time Telemetry
          </div>
          <h3 className="font-display font-light text-3xl md:text-5xl text-white tracking-tight">
            Live Development <span className="font-serif italic text-gold-glow">Stats</span>.
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {statsList.map((stat, idx) => {
            const isGold = stat.color === "gold";
            return (
              <div
                key={stat.label}
                className={`p-6 md:p-8 rounded-2xl ${
                  isGold ? "glass-panel-gold" : "glass-panel-emerald"
                } relative overflow-hidden group`}
              >
                {/* Icon header */}
                <div className="mb-6 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {stat.icon}
                </div>

                {/* Big number counter */}
                <div className="font-display font-light text-3xl md:text-5xl text-white tracking-tighter mb-2.5">
                  <Counter value={stat.value} />
                  <span className={isGold ? "text-gold-champagne text-xl ml-1 font-sans" : "text-emerald-glow text-xl ml-1 font-sans"}>
                    +
                  </span>
                </div>

                {/* Description */}
                <div className="font-mono text-[9px] text-text-secondary uppercase tracking-widest leading-relaxed">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
