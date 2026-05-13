import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Square, Settings2, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

type BreathMode = 'box' | '478' | 'custom';

const MODES = {
  box: { inhale: 4, hold: 4, exhale: 4, holdPost: 4, label: "Box Breathing" },
  '478': { inhale: 4, hold: 7, exhale: 8, holdPost: 0, label: "4-7-8 Breathing" },
  custom: { inhale: 4, hold: 2, exhale: 6, holdPost: 0, label: "Kustom" },
};

export default function BreathingTimer() {
  const [mode, setMode] = useState<BreathMode>('box');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdPost'>('inhale');
  const [timeLeft, setTimeLeft] = useState(MODES[mode].inhale);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPhase('inhale');
      setTimeLeft(MODES[mode].inhale);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Switch Phase
            const nextPhaseMap = {
              inhale: MODES[mode].hold > 0 ? 'hold' : 'exhale',
              hold: 'exhale',
              exhale: MODES[mode].holdPost > 0 ? 'holdPost' : 'inhale',
              holdPost: 'inhale',
            };
            const nextPhase = nextPhaseMap[phase] as typeof phase;
            setPhase(nextPhase);
            return MODES[mode][nextPhase];
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase, mode]);

  const getPhaseText = () => {
    if (!isActive) return "Siap?";
    switch (phase) {
      case 'inhale': return "Tarik Napas";
      case 'hold': return "Tahan";
      case 'exhale': return "Buang Napas";
      case 'holdPost': return "Tahan";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-8">
      {/* Visual Circle */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <motion.div
           className="absolute inset-0 rounded-full border-4 border-teal/10"
        />
        <motion.div
          animate={{
            scale: isActive && phase === 'inhale' ? 1.5 : (isActive && phase === 'exhale' ? 1 : 1.2),
            opacity: isActive ? 1 : 0.6
          }}
          transition={{
            duration: timeLeft,
            ease: "easeInOut"
          }}
          className={cn(
            "w-32 h-32 rounded-full bg-teal shadow-[0_0_50px_rgba(78,205,196,0.2)] flex items-center justify-center",
            isActive && phase === 'hold' && "opacity-80"
          )}
        >
          <span className="text-forest font-bold text-2xl">{isActive ? timeLeft : ''}</span>
        </motion.div>
        
        <div className="absolute -bottom-8 text-center">
            <span className="text-xl font-serif text-cream italic tracking-wide">{getPhaseText()}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-forest/20 backdrop-blur-md p-6 rounded-3xl border border-cream/10 space-y-6 w-full max-w-sm">
        <div className="flex justify-between gap-2">
          {(['box', '478', 'custom'] as BreathMode[]).map((m) => (
            <button
              key={m}
              disabled={isActive}
              onClick={() => { setMode(m); setTimeLeft(MODES[m].inhale); }}
              className={cn(
                "flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all border",
                mode === m ? "bg-teal border-teal text-forest" : "bg-forest/40 border-cream/5 text-sage hover:border-teal/50"
              )}
            >
              {MODES[m].label}
            </button>
          ))}
        </div>

        <button
          onClick={toggleTimer}
          className={cn(
            "w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all shadow-lg",
            isActive ? "bg-red-500/20 text-red-100 border border-red-500/30 hover:bg-red-500/30" : "bg-cream text-forest hover:bg-teal shadow-teal/10"
          )}
        >
          {isActive ? <><Square className="w-5 h-5 fill-current" /> Selesai</> : <><Play className="w-5 h-5 fill-current" /> Mulai Latihan</>}
        </button>
      </div>
      
      <div className="flex items-center gap-2 text-sage text-sm italic">
        <Info className="w-4 h-4" />
        <p>Ikuti pergerakan lingkaran dengan napas Anda.</p>
      </div>
    </div>
  );
}
