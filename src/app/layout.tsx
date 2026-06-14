import type { Metadata } from "next";
import { Outfit, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import AudioToggle from "@/components/layout/AudioToggle";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Naveenkumar D | Full Stack Developer & UI/UX Designer Portfolio",
  description: "Explore the premium digital portfolio of Naveenkumar D, student at Sri Eshwar College of Engineering, specializing in Next.js 15, TypeScript, Tailwind, and interactive WebGL experiences.",
  keywords: ["Naveenkumar D", "Full Stack Developer", "UI/UX Designer", "Next.js Portfolio", "React Three Fiber", "Web Developer Agro Nanba"],
  openGraph: {
    title: "Naveenkumar D // Cosmic Glass Portfolio",
    description: "Premium digital portfolio showcasing Next.js, WebGL and GSAP micro-animations.",
    url: "https://naveen-kumar-d.vercel.app/",
    siteName: "Naveenkumar D Portfolio",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cinzel.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-white font-sans selection:bg-gold-champagne selection:text-bg-primary">
        <SmoothScrollProvider>
          <CustomCursor />
          <AudioToggle />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
