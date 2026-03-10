import React from 'react';
import { motion } from 'motion/react';
import { Question } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuestionStepProps {
  question: Question;
  selectedOption: number | undefined;
  onSelect: (value: number) => void;
  onBack: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  truckCount: number;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({ 
  question, 
  selectedOption, 
  onSelect, 
  onBack, 
  onNext,
  isFirst,
  isLast,
  truckCount
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      {question.id === 3 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-xl text-center"
        >
          <p className="text-[#00E5FF] text-sm font-medium">
            Interesting. At your current size ({truckCount} trucks) this bottleneck is likely costing real time and profit.
          </p>
        </motion.div>
      )}

      <div className="glass-card p-8 md:p-12 mb-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center leading-tight">
          {question.text}
        </h3>
        
        <div className="space-y-4">
          {question.options.map((option) => (
            <motion.button
              key={option.label}
              onClick={() => onSelect(option.value)}
              whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              whileTap={{ scale: 0.99 }}
              className={`w-full h-16 px-6 rounded-xl text-left flex items-center justify-between border transition-all ${
                selectedOption === option.value
                  ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-[#00E5FF]'
                  : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20'
              }`}
            >
              <span className="font-medium">{option.label}</span>
              {selectedOption === option.value && (
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center px-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
        >
          <ChevronLeft size={20} /> Back
        </button>
        
        <button
          onClick={onNext}
          disabled={selectedOption === undefined}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
            selectedOption !== undefined
              ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:brightness-110'
              : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
          }`}
        >
          {isLast ? 'Finish Analysis' : 'Next'} <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};
