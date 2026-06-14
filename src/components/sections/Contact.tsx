"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/utils/data';
import { Send, Mail, Link, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

function Github({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}


export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const validate = () => {
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = 'Please provide your name.';
      isValid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = 'Please provide your email address.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email syntax.';
      isValid = false;
    }
    if (!form.message.trim()) {
      newErrors.message = 'Please input your message details.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);
    // Simulate API delivery
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSending(false);
    setSentSuccess(true);

    // Luxury Gold & Emerald Confetti Blast
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F5E6A8', '#00C896', '#8FFFD8']
    });

    // Reset Form
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSentSuccess(false), 5000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-bg-primary py-28 px-6 md:px-12 flex items-center"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left info column: 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] text-gold-champagne tracking-widest uppercase mb-2">
                08 // Terminal Hub
              </div>
              <h3 className="font-display font-light text-3xl md:text-5xl text-white tracking-tight mb-8">
                Initiate <span className="font-serif italic text-gold-glow">Connection</span>.
              </h3>
              <p className="text-xs md:text-sm text-text-secondary font-light leading-relaxed mb-8">
                Whether you have an enterprise project inquiry or want to discuss full-stack software architectures, my terminal inbox is always active.
              </p>
            </div>

            {/* Social credentials */}
            <div className="space-y-4">
              
              {/* Email */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-bg-secondary/40 hover:border-gold-champagne/30 hover:bg-bg-secondary/80 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-gold-champagne/10 border border-gold-champagne/25 flex items-center justify-center text-gold-champagne">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-[8px] text-text-muted uppercase tracking-widest">Inbox Address</div>
                  <div className="text-xs text-white font-mono">{PERSONAL_INFO.email}</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-bg-secondary/40 hover:border-emerald-mint/30 hover:bg-bg-secondary/80 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-mint/10 border border-emerald-mint/25 flex items-center justify-center text-emerald-glow">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-[8px] text-text-muted uppercase tracking-widest">LinkedIn Profile</div>
                  <div className="text-xs text-white font-mono">linkedin.com/in/naveen30122005/</div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-bg-secondary/40 hover:border-white/20 hover:bg-bg-secondary/80 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-[8px] text-text-muted uppercase tracking-widest">GitHub Repository</div>
                  <div className="text-xs text-white font-mono">github.com/Naveenkumar3327</div>
                </div>
              </a>

            </div>
          </div>

          {/* Right form column: 7 cols */}
          <div className="lg:col-span-7">
            <div className="w-full glass-panel-gold p-8 rounded-2xl relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div>
                  <label className="block font-mono text-[9px] text-text-secondary uppercase tracking-widest mb-2">
                    Name / Company
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-white/5 bg-bg-primary/50 text-white text-xs font-light focus:outline-none focus:border-gold-champagne transition-colors duration-300"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <span className="font-mono text-[9px] text-red-500 mt-1 block">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-mono text-[9px] text-text-secondary uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-white/5 bg-bg-primary/50 text-white text-xs font-light focus:outline-none focus:border-gold-champagne transition-colors duration-300"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <span className="font-mono text-[9px] text-red-500 mt-1 block">{errors.email}</span>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-[9px] text-text-secondary uppercase tracking-widest mb-2">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-white/5 bg-bg-primary/50 text-white text-xs font-light focus:outline-none focus:border-gold-champagne transition-colors duration-300 resize-none"
                    placeholder="Describe your project requirements or objectives..."
                  />
                  {errors.message && (
                    <span className="font-mono text-[9px] text-red-500 mt-1 block">{errors.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-gold-champagne to-gold-glow text-bg-primary text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold-champagne/20 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {isSending ? (
                    <span className="animate-pulse">Delivering Transmissions...</span>
                  ) : sentSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-mint" />
                      <span>Message Delivered</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

        {/* Brand footer details */}
        <div className="mt-28 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between font-mono text-[9px] tracking-widest text-text-muted uppercase gap-4">
          <span>© 2026 Naveenkumar D // All Rights Reserved.</span>
          <span>Designed with Cosmic Glass Luxury System</span>
        </div>
      </div>
    </section>
  );
}
