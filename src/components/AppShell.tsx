import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#00E5FF] rounded-lg flex items-center justify-center shadow-[0_0_15px_#00E5FF]">
              <span className="text-black font-bold text-xl">I</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Integr-AI-tion</span>
          </div>
          <div className="text-xs font-mono text-white/40 uppercase tracking-widest">
            Premium Diagnostic v2.0
          </div>
        </header>
        
        <main className="relative min-h-[500px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
