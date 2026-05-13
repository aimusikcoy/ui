import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Timer, MousePointer2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import confetti from 'canvas-confetti';

const TASKS = [
  { id: 'click', text: "Klik Lingkaran!", btn: "Klik" },
  { id: 'hold', text: "Tahan tombol 2 detik!", btn: "Tahan" },
  { id: 'wait', text: "Jangan tekan apa-apa...", btn: "Tunggu" },
  { id: 'double', text: "Klik dua kali cepat!", btn: "Double Klik" }
];

export default function FocusTest() {
  const [gameState, setGameState] = useState<'idle' | 'running' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState(120);
  const [currentTask, setCurrentTask] = useState(0);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'fail', text: string } | null>(null);

  const startTest = () => {
    setGameState('running');
    setTimeLeft(120);
    setScore(0);
    setTotalAttempts(0);
    nextTask();
  };

  const nextTask = useCallback(() => {
    setCurrentTask(Math.floor(Math.random() * TASKS.length));
    setFeedback(null);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'running' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setGameState('finished');
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleAction = (type: string) => {
    if (gameState !== 'running') return;
    
    setTotalAttempts(t => t + 1);
    const correct = TASKS[currentTask].id === type;
    
    if (correct) {
      setScore(s => s + 1);
      setFeedback({ type: 'success', text: "Bagus!" });
      setTimeout(nextTask, 500);
    } else {
      setFeedback({ type: 'fail', text: "Kurang Fokus!" });
      setTimeout(nextTask, 1000);
    }
  };

  // Special handling for 'wait' task
  useEffect(() => {
    let waitTimer: NodeJS.Timeout;
    if (gameState === 'running' && TASKS[currentTask].id === 'wait') {
       waitTimer = setTimeout(() => {
          setScore(s => s + 1);
          setTotalAttempts(t => t + 1);
          setFeedback({ type: 'success', text: "Sabar yang luar biasa!" });
          setTimeout(nextTask, 500);
       }, 3000);
    }
    return () => clearTimeout(waitTimer);
  }, [currentTask, gameState, nextTask]);

  return (
    <div className="max-w-xl mx-auto py-10">
      <AnimatePresence mode="wait">
        {gameState === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8"
          >
            <div className="w-24 h-24 rounded-full bg-forest/40 flex items-center justify-center mx-auto border border-teal/20">
               <Target className="w-12 h-12 text-teal animate-pulse" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-serif">Uji Fokus Anda dalam 2 Menit</h3>
              <p className="text-sage italic">
                Tugas-tugas mikro akan muncul. Bereaksi secepat dan seakurat mungkin.
                Ujian ini mengukur ketahanan konsentrasi Anda.
              </p>
            </div>
            <button
              onClick={startTest}
              className="px-10 py-4 bg-teal text-forest rounded-full font-bold text-lg hover:bg-cream transition-all hover:scale-105"
            >
              Mulai Tes
            </button>
          </motion.div>
        )}

        {gameState === 'running' && (
          <motion.div
            key="running"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <div className="flex justify-between items-end border-b border-cream/10 pb-4">
               <div>
                  <label className="text-[10px] font-mono text-sage uppercase tracking-widest block">Waktu Tersisa</label>
                  <div className="flex items-center gap-2 text-2xl font-mono text-cream">
                     <Timer className="w-5 h-5 text-teal" />
                     {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </div>
               </div>
               <div className="text-right">
                  <label className="text-[10px] font-mono text-sage uppercase tracking-widest block">Akurasi Fokus</label>
                  <div className="text-2xl font-mono text-cream">
                     {score} <span className="text-sage text-sm">pnt</span>
                  </div>
               </div>
            </div>

            <div className="h-64 flex flex-col items-center justify-center gap-8 relative">
                <AnimatePresence mode="wait">
                   <motion.div
                     key={currentTask}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     className="text-center"
                   >
                      <h2 className="text-4xl font-serif italic text-cream">{TASKS[currentTask].text}</h2>
                   </motion.div>
                </AnimatePresence>

                <div className="flex gap-4 items-center">
                   {TASKS[currentTask].id === 'click' && (
                     <motion.button
                       whileTap={{ scale: 0.9 }}
                       onClick={() => handleAction('click')}
                       className="w-24 h-24 rounded-full bg-teal flex items-center justify-center shadow-lg shadow-teal/20"
                     >
                       <MousePointer2 className="text-forest w-8 h-8" />
                     </motion.button>
                   )}
                   
                   {TASKS[currentTask].id === 'double' && (
                     <motion.button
                       onDoubleClick={() => handleAction('double')}
                       className="px-8 py-4 rounded-2xl bg-cream text-forest font-bold border-2 border-forest"
                     >
                       Double Klik Me!
                     </motion.button>
                   )}

                   {TASKS[currentTask].id === 'hold' && (
                     <motion.button
                       onMouseDown={() => {
                          const t = setTimeout(() => handleAction('hold'), 2000);
                          (window as any)._holdTimer = t;
                       }}
                       onMouseUp={() => clearTimeout((window as any)._holdTimer)}
                       className="px-8 py-4 rounded-2xl bg-forest/60 text-cream border border-cream/20 font-bold"
                     >
                       Tahan 2s...
                     </motion.button>
                   )}
                </div>

                <AnimatePresence>
                   {feedback && (
                     <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0 }}
                       className={cn(
                          "absolute top-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm",
                          feedback.type === 'success' ? "bg-teal/20 text-teal" : "bg-red-400/20 text-red-400"
                       )}
                     >
                        {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {feedback.text}
                     </motion.div>
                   )}
                </AnimatePresence>
            </div>
          </motion.div>
        )}

        {gameState === 'finished' && (
           <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-10"
          >
             <div className="space-y-2">
                <h3 className="text-4xl font-serif italic">Ketajaman Fokus: {Math.round((score / (totalAttempts || 1)) * 100)}%</h3>
                <p className="text-sage">Anda berhasil menyelesaikan {score} tugas mikro dalam 2 menit.</p>
             </div>
             <div className="p-8 glass-card">
                <p className="text-cream leading-relaxed italic">
                   {score > 40 ? "Luar biasa. Pikiran Anda sangat tajam dan hadir." : 
                    score > 20 ? "Bagus. Anda memiliki stabilitas fokus yang cukup baik." :
                    "Coba lagi. Mungkin ada banyak gangguan di pikiran Anda saat ini."}
                </p>
             </div>
             <button
                onClick={() => setGameState('idle')}
                className="px-8 py-3 rounded-full bg-forest text-cream border border-teal/30 hover:bg-teal/20"
             >
                Coba Lagi
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
