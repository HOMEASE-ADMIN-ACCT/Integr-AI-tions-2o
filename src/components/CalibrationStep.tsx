import React from 'react';
import { motion } from 'motion/react';
import { Truck, Zap, Droplets, Hammer, Lightbulb, ChevronLeft, Save } from 'lucide-react';
import { Industry } from '../types';

interface CalibrationStepProps {
  industry: Industry;
  truckCount: number;
  onUpdate: (data: { industry?: Industry; truckCount?: number }) => void;
  onBack: () => void;
  onNext: () => void;
  onSave: () => void;
}

const industries: { name: Industry; icon: any }[] = [
  { name: 'HVAC', icon: Zap },
  { name: 'Plumbing', icon: Droplets },
  { name: 'Roofing', icon: Hammer },
  { name: 'Electrical', icon: Lightbulb },
];

export const CalibrationStep: React.FC<CalibrationStepProps> = ({ industry, truckCount, onUpdate, onBack, onNext, onSave }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card p-8 md:p-12 w-full max-w-xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="text-white/40 hover:text-white transition-all flex items-center gap-2 text-xs uppercase tracking-widest font-mono"
        >
          <ChevronLeft size={14} /> Back
        </button>
        <button 
          onClick={onSave}
          className="text-[#00E5FF]/60 hover:text-[#00E5FF] transition-all flex items-center gap-2 text-xs uppercase tracking-widest font-mono"
        >
          <Save size={14} /> Save Progress
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-center">Calibrate Your Shop</h2>
      
      <div className="space-y-10">
        <div>
          <label className="block text-sm font-mono text-white/40 uppercase tracking-widest mb-4">Select Your Industry</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((ind) => (
              <button
                key={ind.name}
                onClick={() => onUpdate({ industry: ind.name })}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all ${
                  industry === ind.name 
                    ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-[#00E5FF]' 
                    : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30'
                }`}
              >
                <ind.icon size={24} />
                <span className="text-xs font-bold">{ind.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-4">
            <label className="block text-sm font-mono text-white/40 uppercase tracking-widest">Field Rotation Size</label>
            <span className="text-3xl font-bold text-[#00E5FF]">{truckCount} <span className="text-sm text-white/40">Trucks</span></span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={truckCount}
            onChange={(e) => onUpdate({ truckCount: parseInt(e.target.value) })}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
          />
          <div className="flex justify-between mt-2 text-[10px] font-mono text-white/20">
            <span>1 TRUCK</span>
            <span>100 TRUCKS</span>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full bg-[#00E5FF] text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:brightness-110 transition-all"
        >
          Generate Initial Snapshot
        </button>
      </div>
    </motion.div>
  );
};
