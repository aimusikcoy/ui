import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, TrendingUp, AlertCircle, CheckCircle, Save, Calendar } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface DayReflection {
  date: string;
  oneThing: string;
  obstacle: string;
  score: number;
}

export default function BetterReflection() {
  const [history, setHistory] = useState<DayReflection[]>(() => {
    const saved = localStorage.getItem('dharaloka_1p_reflection');
    return saved ? JSON.parse(saved) : [];
  });

  const [current, setCurrent] = useState<DayReflection>({
    date: new Date().toISOString(),
    oneThing: '',
    obstacle: '',
    score: 3
  });

  const [saved, setSaved] = useState(false);

  const save = () => {
    const newHistory = [current, ...history];
    setHistory(newHistory);
    localStorage.setItem('dharaloka_1p_reflection', JSON.stringify(newHistory));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setCurrent({ date: new Date().toISOString(), oneThing: '', obstacle: '', score: 3 });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-2">
           <h3 className="text-3xl font-serif italic">Prinsip 1% Lebih Baik</h3>
           <p className="text-sage text-sm italic">"Keunggulan bukan tindakan tunggal, tapi kebiasaan." — Aristoteles</p>
        </div>

        <div className="space-y-6">
           <div className="space-y-3">
              <label className="text-xs font-mono text-teal uppercase tracking-widest pl-2">1. Apa satu hal kecil yang saya lakukan lebih baik hari ini?</label>
              <textarea
                value={current.oneThing}
                onChange={(e) => setCurrent({ ...current, oneThing: e.target.value })}
                placeholder="Misal: Saya mematikan notifikasi saat bekerja..."
                className="w-full bg-forest/20 border border-cream/10 rounded-2xl p-4 text-cream text-sm focus:outline-none focus:border-teal/50 h-24 resize-none"
              />
           </div>

           <div className="space-y-3">
              <label className="text-xs font-mono text-teal uppercase tracking-widest pl-2">2. Apa hambatan terbesar hari ini?</label>
              <textarea
                value={current.obstacle}
                onChange={(e) => setCurrent({ ...current, obstacle: e.target.value })}
                placeholder="Misal: Terlalu lama di media sosial..."
                className="w-full bg-forest/20 border border-cream/10 rounded-2xl p-4 text-cream text-sm focus:outline-none focus:border-teal/50 h-24 resize-none"
              />
           </div>

           <div className="space-y-3">
              <label className="text-xs font-mono text-teal uppercase tracking-widest pl-2">3. Skor keselarasan hari ini (1-5)</label>
              <div className="flex gap-4">
                 {[1, 2, 3, 4, 5].map(n => (
                   <button
                    key={n}
                    onClick={() => setCurrent({ ...current, score: n })}
                    className={cn(
                      "flex-1 py-3 rounded-xl border font-mono transition-all",
                      current.score === n ? "bg-teal border-teal text-forest font-bold" : "bg-forest/40 border-cream/5 text-sage"
                    )}
                   >
                     {n}
                   </button>
                 ))}
              </div>
           </div>

           <button
             onClick={save}
             disabled={!current.oneThing || !current.obstacle}
             className="w-full py-4 bg-cream text-forest rounded-2xl font-bold hover:bg-teal transition-all disabled:opacity-30 flex items-center justify-center gap-2"
           >
              <Save className="w-5 h-5" /> Simpan Refleksi
           </button>
           
           <AnimatePresence>
             {saved && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-teal text-xs italic">
                  Tersimpan di jurnal mingguan Anda.
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      <div className="space-y-6">
         <div className="flex items-center gap-2 text-sage text-sm font-mono uppercase tracking-widest">
            <TrendingUp className="w-4 h-4" />
            <span>Tren Pertumbuhan</span>
         </div>
         
         <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
            {history.map((h, i) => (
              <div key={i} className="p-6 glass-card !p-5 relative overflow-hidden group">
                 <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono text-teal">{new Date(h.date).toLocaleDateString()}</span>
                    <div className="flex gap-1">
                       {Array.from({ length: h.score }).map((_, j) => (
                          <div key={j} className="w-1 h-3 bg-teal rounded-full" />
                       ))}
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex gap-2">
                       <CheckCircle className="w-3 h-3 text-teal mt-1 shrink-0" />
                       <p className="text-xs text-cream/90 italic">{h.oneThing}</p>
                    </div>
                    <div className="flex gap-2">
                       <AlertCircle className="w-3 h-3 text-red-400 mt-1 shrink-0" />
                       <p className="text-xs text-sage italic">{h.obstacle}</p>
                    </div>
                 </div>
              </div>
            ))}
            {history.length === 0 && (
              <div className="h-40 flex flex-col items-center justify-center text-sage opacity-40 italic">
                 <Calendar className="w-8 h-8 mb-2" />
                 <p>Belum ada rekaman pertumbuhan.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}
