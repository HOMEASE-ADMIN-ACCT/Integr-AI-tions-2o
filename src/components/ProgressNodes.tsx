import React from 'react';
import { motion } from 'motion/react';

interface ProgressNodesProps {
  total: number;
  current: number;
}

export const ProgressNodes: React.FC<ProgressNodesProps> = ({ total, current }) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        const isCompleted = i < current;
        
        return (
          <div key={`progress-node-${i}`} className="flex items-center">
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                isCompleted 
                  ? 'bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]' 
                  : isActive 
                    ? 'bg-[#00E5FF] animate-breathing' 
                    : 'bg-white/10'
              }`}
            />
            {i < total - 1 && (
              <div className={`w-8 h-[1px] ml-4 ${isCompleted ? 'bg-[#00E5FF]/40' : 'bg-white/5'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};
