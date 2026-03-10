import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface ProcessingEngineProps {
  onComplete: () => void;
}

export const ProcessingEngine: React.FC<ProcessingEngineProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 100));
    }, 30);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative w-64 h-64 mb-12">
        {/* Animated Nodes and Lines */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <motion.circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const x = 50 + 35 * Math.cos((angle * Math.PI) / 180);
            const y = 50 + 35 * Math.sin((angle * Math.PI) / 180);
            return (
              <React.Fragment key={`engine-node-${i}`}>
                <motion.line
                  x1="50" y1="50" x2={x} y2={y}
                  stroke="#00E5FF"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ delay: i * 0.2, duration: 1 }}
                />
                <motion.circle
                  cx={x} cy={y} r="3"
                  fill="#00E5FF"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: i * 0.2 + 0.5, duration: 0.5 }}
                />
              </React.Fragment>
            );
          })}
          
          <motion.circle
            cx="50" cy="50" r="10"
            fill="#00E5FF"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold font-mono">{progress}%</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Mapping Your Shop's Growth Path</h2>
      <div className="flex flex-col gap-2 text-white/40 font-mono text-xs uppercase tracking-widest">
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Analyzing dispatch bottlenecks...
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          Calculating profit leakage...
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
        >
          Building custom system architecture...
        </motion.span>
      </div>
    </div>
  );
};
