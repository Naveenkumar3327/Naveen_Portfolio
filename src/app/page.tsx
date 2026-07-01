"use client";

import FloatingNav from '@/components/layout/FloatingNav';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Achievements from '@/components/sections/Achievements';
import Certifications from '@/components/sections/Certifications';
import Stats from '@/components/sections/Stats';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative w-full bg-bg-primary overflow-x-hidden animate-[fadeIn_0.8s_ease-out]">
      <FloatingNav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Certifications />
      <Stats />
      <Contact />
    </main>
  );
}
