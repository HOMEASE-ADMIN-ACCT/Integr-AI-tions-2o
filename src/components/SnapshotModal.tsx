import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingDown, AlertCircle, ArrowRight } from 'lucide-react';

interface SnapshotModalProps {
  isOpen: boolean;
  truckCount: number;
  onClose: () => void;
}

export const SnapshotModal: React.FC<SnapshotModalProps> = ({ isOpen, truckCount, onClose }) => {
  const lostHours = Math.round(truckCount * 1.2);
  const lostProfitMin = truckCount * 250;
  const lostProfitMax = truckCount * 450;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-card p-8 md:p-10 max-w-lg w-full relative z-10 border-[#00E5FF]/40"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#00E5FF]/20 rounded-lg">
                <TrendingDown className="text-[#00E5FF]" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Shop Snapshot</h2>
            </div>

            <p className="text-white/70 mb-8 leading-relaxed">
              Companies with <span className="text-white font-bold">{truckCount} trucks</span> typically lose
              <span className="text-[#00E5FF] font-bold"> {lostHours}–{lostHours + 5} hours</span> each week to manual coordination.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Starter Score</div>
                <div className="text-3xl font-bold text-[#00E5FF]">62<span className="text-sm text-white/40">/100</span></div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Est. Profit Lost</div>
                <div className="text-xl font-bold text-red-400">
                  ${lostProfitMin.toLocaleString()} – ${lostProfitMax.toLocaleString()}
                  <span className="block text-[10px] text-white/40">per month</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-8">
              <AlertCircle className="text-red-400 shrink-0" size={20} />
              <p className="text-xs text-red-200/70">
                This creates an artificial head start. Most shops at your scale can recover this lost profit with automated growth systems.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#00E5FF] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            >
              Improve Your Score <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
