import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Wind, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const pmrSteps = [
  { id: 'hands', title: "Tangan & Lengan", muscles: "Kepalkan tangan sekuat mungkin", desc: "Tahan selama 5 detik... lalu lepaskan sekaligus. Rasakan aliran kelegaannya.", time: 10 },
  { id: 'face', title: "Wajah", muscles: "Kerutkan kening dan kencangkan bibir", desc: "Tahan... dan lepaskan. Biarkan wajah Anda melunak.", time: 10 },
  { id: 'shoulders', title: "Bahu", muscles: "Angkat bahu hingga menyentuh telinga", desc: "Tahan ketegangannya... lepaskan. Rasakan bahu Anda menjadi ringan.", time: 10 },
  { id: 'chest', title: "Dada & Perut", muscles: "Tarik napas dalam dan kencangkan perut", desc: "Tahan... buang napas perlahan dan lepaskan semua beban.", time: 10 },
  { id: 'legs', title: "Kaki & Jari Kaki", muscles: "Tekuk jari kaki ke bawah dan kencangkan betis", desc: "Tahan... dan lepaskan. Rasakan berat tubuh yang tenang.", time: 10 },
];

export default function PMR() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isTensing, setIsTensing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTensing && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (isTensing && timeLeft === 0) {
      setIsTensing(false);
      setTimeLeft(10); // Show release note for 10s
    }
    return () => clearInterval(timer);
  }, [isTensing, timeLeft]);

  const next = () => {
    if (currentIdx < pmrSteps.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setIsTensing(false);
      setTimeLeft(5);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 text-center">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-12"
          >
             <div className="space-y-2">
                <span className="text-xs font-mono text-teal uppercase tracking-[0.3em] font-bold">Relaksasi Otot Progresif</span>
                <h2 className="text-4xl font-serif italic text-cream">{pmrSteps[currentIdx].title}</h2>
             </div>

             <div className="h-64 flex flex-col items-center justify-center gap-6">
                <div className={cn(
                   "w-48 h-48 rounded-full border-2 transition-all duration-1000 flex flex-col items-center justify-center p-8",
                   isTensing ? "border-red-400 bg-red-400/5 scale-110" : "border-teal/20 bg-teal/5"
                )}>
                   <span className="text-sm font-bold text-sage mb-2">{isTensing ? 'TEGANGKAN' : 'RILEKS'}</span>
                   <span className="text-4xl font-mono font-light">{timeLeft}s</span>
                </div>
                <p className="text-lg text-cream italic max-w-sm">
                   {isTensing ? pmrSteps[currentIdx].muscles : pmrSteps[currentIdx].desc}
                </p>
             </div>

             <div className="flex justify-center gap-4">
                {!isTensing && timeLeft === 10 ? (
                  <button
                    onClick={next}
                    className="px-8 py-3 bg-teal text-forest rounded-full font-bold flex items-center gap-2 hover:bg-cream transition-all"
                  >
                    Langkah Berikutnya <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    disabled={isTensing}
                    onClick={() => { setIsTensing(true); setTimeLeft(5); }}
                    className="px-10 py-4 bg-cream text-forest rounded-full font-bold shadow-xl hover:bg-teal disabled:opacity-50 transition-all"
                  >
                    Tegang Sekarang
                  </button>
                )}
             </div>
          </motion.div>
        ) : (
          <motion.div
            key="finish"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
             <div className="w-20 h-20 bg-teal/20 rounded-full flex items-center justify-center mx-auto text-teal">
                <Check className="w-10 h-10" />
             </div>
             <h3 className="text-3xl font-serif italic">Tubuh Anda Sekarang Tenang.</h3>
             <p className="text-sage italic">Latihan PMR membantu melepaskan stres fisik yang menumpuk. Gunakan ini sebelum tidur untuk kualitas istirahat yang lebih baik.</p>
             <button
               onClick={() => { setCurrentIdx(0); setIsFinished(false); }}
               className="px-8 py-3 rounded-full border border-teal/20 text-teal hover:bg-teal/10"
             >
                Ulangi Latihan
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
