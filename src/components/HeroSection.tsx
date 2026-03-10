import React from 'react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center max-w-2xl mx-auto"
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
        See Your Business <br />
        <span className="text-[#00E5FF]">Growth Map</span>
      </h1>
      <p className="text-xl text-white/60 mb-10 leading-relaxed">
        In 2 minutes, see where service companies lose time 
        and how a custom system fixes it.
      </p>
      
      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
        whileTap={{ scale: 0.98 }}
        className="bg-[#00E5FF] text-black font-bold px-10 py-5 rounded-xl text-xl shadow-[0_0_25px_rgba(0,229,255,0.4)] halo-glow transition-all"
      >
        Check Your Shop's Health
      </motion.button>
      
      <div className="mt-12 flex justify-center gap-8 text-white/30 text-sm font-mono uppercase tracking-widest">
        <span>HVAC</span>
        <span>Plumbing</span>
        <span>Roofing</span>
        <span>Electrical</span>
      </div>
    </motion.div>
  );
};
