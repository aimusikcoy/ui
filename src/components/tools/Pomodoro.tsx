import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Coffee, Brain, Bell, Settings } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function MindfulPomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [focusNotes, setFocusNotes] = useState('');
  const [showNotePad, setShowNotePad] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound would go here
      alert(mode === 'work' ? "Waktunya istirahat sejenak." : "Kembali ke fokus utama.");
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, mode]);

  const toggle = () => setIsActive(!isActive);

  const reset = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (mode === 'work' ? 25 * 60 : 5 * 60)) * 100;

  return (
    <div className="max-w-md mx-auto flex flex-col items-center">
      {/* Visual Timer */}
      <div className="relative w-72 h-72 flex items-center justify-center mb-12">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="144"
            cy="144"
            r="130"
            className="stroke-cream/5 fill-none"
            strokeWidth="8"
          />
          <motion.circle
            cx="144"
            cy="144"
            r="130"
            className="stroke-teal fill-none"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 1 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>

        <div className="text-center group cursor-pointer" onClick={() => setShowNotePad(!showNotePad)}>
          <motion.div
            initial={false}
            animate={{ scale: isActive ? 1.1 : 1 }}
            className="text-7xl font-mono font-light text-cream tracking-tighter"
          >
            {formatTime(timeLeft)}
          </motion.div>
          <div className="flex items-center justify-center gap-2 text-sage mt-2">
            {mode === 'work' ? (
              <><Brain className="w-4 h-4" /> <span>Mode Fokus</span></>
            ) : (
              <><Coffee className="w-4 h-4" /> <span>Istirahat</span></>
            )}
          </div>
        </div>
      </div>

      {/* Modes */}
      <div className="flex gap-2 p-1 bg-forest/40 rounded-2xl border border-cream/5 mb-8">
        <button
          onClick={() => switchMode('work')}
          className={cn(
            "px-6 py-2 rounded-xl text-sm transition-all",
            mode === 'work' ? "bg-teal text-forest font-bold" : "text-sage hover:text-cream"
          )}
        >
          Fokus
        </button>
        <button
          onClick={() => switchMode('break')}
          className={cn(
            "px-6 py-2 rounded-xl text-sm transition-all",
            mode === 'break' ? "bg-teal text-forest font-bold" : "text-sage hover:text-cream"
          )}
        >
          Istirahat
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mb-12">
        <button
          onClick={reset}
          className="w-12 h-12 rounded-full border border-cream/10 flex items-center justify-center text-sage hover:text-cream hover:border-cream/30 transition-all"
        >
          <RotateCcw className="w-6 h-6" />
        </button>

        <button
          onClick={toggle}
          className="w-20 h-20 rounded-full bg-cream text-forest flex items-center justify-center shadow-xl shadow-teal/5 transition-transform hover:scale-110 active:scale-95"
        >
          {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
        </button>

        <button className="w-12 h-12 rounded-full border border-cream/10 flex items-center justify-center text-sage hover:text-cream hover:border-cream/30 transition-all">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {showNotePad && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-full space-y-3"
          >
             <label className="text-xs font-mono text-sage uppercase tracking-widest pl-2">Apa niat fokus Anda?</label>
             <textarea
              value={focusNotes}
              onChange={(e) => setFocusNotes(e.target.value)}
              placeholder="Tulis satu tugas utama di sini..."
              className="w-full bg-forest/30 border border-cream/10 rounded-2xl p-4 text-cream placeholder:text-sage/40 text-sm focus:outline-none focus:border-teal/50 h-24 resize-none"
             />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
