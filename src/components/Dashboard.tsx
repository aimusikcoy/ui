import React from 'react';
import { motion } from 'motion/react';
import { Activity, Flame, Clock, Trophy, Book, Heart, Brain, Moon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Dashboard() {
  // Aggregate stats from localStorage
  const habits = JSON.parse(localStorage.getItem('dharaloka_habits') || '[]');
  const journal = JSON.parse(localStorage.getItem('dharaloka_journal') || '[]');
  const emotions = JSON.parse(localStorage.getItem('dharaloka_emotions') || '[]');
  const reflections = JSON.parse(localStorage.getItem('dharaloka_1p_reflection') || '[]');
  
  const totalPracticeTime = (journal.length * 5) + (reflections.length * 10) + (emotions.length * 2); // rough estimate
  const totalActivities = habits.length + journal.length + emotions.length + reflections.length;
  
  const stats = [
    { label: "Waktu Hening", value: `${totalPracticeTime}m`, icon: <Clock />, color: "text-teal" },
    { label: "Aktivitas", value: totalActivities, icon: <Activity />, color: "text-sage" },
    { label: "Streak", value: "3 Hari", icon: <Flame />, color: "text-cream" },
    { label: "Refleksi", value: reflections.length, icon: <Book />, color: "text-teal" }
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0F1A17] border border-sage/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-sage/30 transition-all shadow-lg"
          >
            <p className={cn("text-3xl font-serif mb-2", s.color)}>{s.value}</p>
            <p className="text-[10px] opacity-40 uppercase tracking-[0.2em] font-bold">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="glass-card !bg-forest/20 !border-sage/10">
            <h3 className="text-2xl font-serif italic mb-8 flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-teal"></span> Keseimbangan Batin
            </h3>
            <div className="space-y-6">
               <SkillBar label="Fokus Digital" progress={75} />
               <SkillBar label="Kesehatan Emosi" progress={60} />
               <SkillBar label="Konsistensi Diri" progress={45} />
            </div>
         </div>

         <div className="glass-card !bg-[#F8F1E3] !text-[#0F1A17] flex flex-col justify-between items-center text-center space-y-6 !p-10 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#0A3D33] flex items-center justify-center text-[#F8F1E3]">
               <Trophy className="w-8 h-8" />
            </div>
            <div>
               <h4 className="font-serif italic text-2xl mb-2">Penjaga Keheningan</h4>
               <p className="text-sm opacity-70 leading-relaxed font-serif">Lakukan meditasi 7 hari berturut-turut untuk membuka tingkatan spiritual baru.</p>
            </div>
            <div className="w-full space-y-2">
               <div className="w-full bg-[#0F1A17]/10 h-1.5 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-[#0A3D33]" />
               </div>
               <p className="text-[10px] font-bold tracking-widest opacity-40 uppercase">3/4 Tantangan Selesai</p>
            </div>
         </div>
      </div>
    </div>
  );
}

function SkillBar({ label, progress }: { label: string, progress: number }) {
  return (
    <div className="space-y-3">
       <div className="flex justify-between text-[10px] font-bold text-sage uppercase tracking-widest">
          <span>{label}</span>
          <span>{progress}%</span>
       </div>
       <div className="h-1 bg-forest/40 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-teal"
          />
       </div>
    </div>
  );
}
