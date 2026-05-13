import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Volume2, Timer } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const steps = [
  { id: 'start', title: "Persiapan", desc: "Berbaringlah dengan nyaman atau duduk tegak. Tutup mata Anda perlahan. Rasakan berat tubuh Anda di tempat Anda berada.", time: 10 },
  { id: 'feet', title: "Telapak Kaki", desc: "Sadari sensasi di telapak kaki Anda. Gatal, hangat, dingin, atau tekanan. Jangan ubah apa pun, cukup sadari.", time: 30 },
  { id: 'ankles', title: "Pergelangan Kaki", desc: "Bayangkan napas Anda mengalir ke pergelangan kaki. Rasakan kelegaan saat Anda mengembuskan napas.", time: 20 },
  { id: 'legs', title: "Betis & Paha", desc: "Rasakan kontak otot paha dengan kursi atau lantai. Jika ada ketegangan, biarkan ia melunak dengan sendirinya.", time: 30 },
  { id: 'hips', title: "Pinggul & Perut", desc: "Perhatikan pasang surut perut Anda. Rasakan energi yang tenang mengalir di area pinggul.", time: 30 },
  { id: 'back', title: "Punggung & Tulang Belakang", desc: "Rasakan setiap ruas tulang belakang Anda. Berikan apresiasi pada tubuh yang mendukung Anda sepanjang hari.", time: 30 },
  { id: 'hands', title: "Tangan & Lengan", desc: "Istirahatkan jari-jari Anda. Rasakan denyut halus di telapak tangan.", time: 30 },
  { id: 'shoulders', title: "Bahu & Leher", desc: "Banyak ketegangan tersimpan di sini. Ambil napas dalam, dan saat buang napas, bayangkan bahu Anda turun menjauhi telinga.", time: 30 },
  { id: 'face', title: "Wajah & Kepala", desc: "Lemaskan rahang, kelopak mata, dan kening. Biarkan seluruh wajah Anda menjadi tenang seutuhnya.", time: 30 },
  { id: 'finish', title: "Kesadaran Utuh", desc: "Rasakan tubuh Anda sebagai satu kesatuan yang utuh dan selaras. Tersenyumlah pada diri sendiri.", time: 20 },
];

export default function BodyScan() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(steps[0].time);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && currentIdx < steps.length - 1) {
      next();
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, currentIdx]);

  const next = () => {
    if (currentIdx < steps.length - 1) {
      setCurrentIdx(i => i + 1);
      setTimeLeft(steps[currentIdx + 1].time);
    }
  };

  const prev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(i => i - 1);
      setTimeLeft(steps[currentIdx - 1].time);
    }
  };

  const toggle = () => setIsActive(!isActive);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-12 flex justify-between items-center text-xs font-mono text-sage uppercase tracking-widest">
         <span>Langkah {currentIdx + 1} / {steps.length}</span>
         <div className="flex items-center gap-2">
            <Timer className="w-3 h-3" />
            <span>{timeLeft} detik tersisa</span>
         </div>
      </div>

      <div className="h-80 flex flex-col items-center justify-center text-center px-8 relative">
          <AnimatePresence mode="wait">
             <motion.div
               key={currentIdx}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="space-y-6"
             >
                <h2 className="text-3xl font-serif italic text-teal">{steps[currentIdx].title}</h2>
                <p className="text-xl text-cream leading-relaxed font-light italic">
                   "{steps[currentIdx].desc}"
                </p>
             </motion.div>
          </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-center gap-8">
          <button
            onClick={prev}
            disabled={currentIdx === 0}
            className="p-4 rounded-full border border-cream/10 text-sage hover:text-cream disabled:opacity-0 transition-all"
          >
             <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={toggle}
            className={cn(
               "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl",
               isActive ? "bg-teal/20 text-teal border border-teal/40" : "bg-cream text-forest"
            )}
          >
             {isActive ? <div className="w-6 h-6 bg-teal rounded-sm" /> : <Volume2 className="w-8 h-8" />}
          </button>

          <button
            onClick={next}
            disabled={currentIdx === steps.length - 1}
            className="p-4 rounded-full border border-cream/10 text-sage hover:text-cream disabled:opacity-0 transition-all"
          >
             <ChevronRight className="w-6 h-6" />
          </button>
      </div>

      <div className="mt-12 w-full bg-forest/20 h-1.5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-teal"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / steps.length) * 100}%` }}
          />
      </div>
    </div>
  );
}
