"use client";

import { useEffect, useRef, useState } from 'react';
import { VolumeX } from 'lucide-react';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const startAmbientSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master output gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Low Pass filter for a warm deep hum
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(130, ctx.currentTime);
      filter.Q.setValueAtTime(4, ctx.currentTime);
      filter.connect(masterGain);
      filterRef.current = filter;

      // Low hum oscillator 1 (55Hz - A1 note)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);

      // Fifth harmonic oscillator 2 (82.4Hz - E2 note)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(82.4, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;

      // LFO to slowly sweep filter cutoff (gently mimics space breathing/waves)
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // 12.5 seconds per sweep
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(35, ctx.currentTime); // mod range +/- 35Hz

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      lfoRef.current = lfo;

      // Fade in smoothly over 3 seconds
      masterGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 3.0);
      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio Context blocked or unsupported:", e);
    }
  };

  const stopAmbientSynth = () => {
    const masterGain = gainNodeRef.current;
    const ctx = audioCtxRef.current;
    if (masterGain && ctx) {
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      setTimeout(() => {
        osc1Ref.current?.stop();
        osc2Ref.current?.stop();
        lfoRef.current?.stop();
        ctx.close();
        audioCtxRef.current = null;
        gainNodeRef.current = null;
        osc1Ref.current = null;
        osc2Ref.current = null;
        lfoRef.current = null;
      }, 500);
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAmbientSynth();
    } else {
      startAmbientSynth();
    }
  };

  useEffect(() => {
    return () => {
      // Stop audio on unmount
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-8 left-8 z-40 flex items-center justify-center gap-3.5 glass-panel-gold rounded-full px-5 py-2.5 text-[10px] font-mono uppercase tracking-widest text-gold-champagne hover:scale-105 active:scale-95 transition-all duration-300"
    >
      <div className="flex items-center gap-[2px] h-3.5 w-6 justify-center">
        {isPlaying ? (
          <>
            <span className="sound-bar" />
            <span className="sound-bar" />
            <span className="sound-bar" />
            <span className="sound-bar" />
            <span className="sound-bar" />
          </>
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-text-muted" />
        )}
      </div>
      <span>{isPlaying ? "Ambient Synth On" : "Mute Sound"}</span>
    </button>
  );
}
