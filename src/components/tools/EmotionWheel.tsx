import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smile, Frown, Meh, Zap, Moon, Sun, Save, History, Calendar } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { format } from 'date-fns';

const moods = [
  { id: 'vibrant', emoji: '🌟', label: 'Bertenaga', color: 'bg-yellow-400' },
  { id: 'calm', emoji: '🍃', label: 'Tenang', color: 'bg-teal' },
  { id: 'neutral', emoji: '😐', label: 'Biasa Saja', color: 'bg-sage' },
  { id: 'low', emoji: '☁️', label: 'Kurang Mood', color: 'bg-slate-400' },
  { id: 'exhausted', emoji: '🔋', label: 'Lelah', color: 'bg-forest' },
];

export default function EmotionWheel() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [history, setHistory] = useState<{ id: string, date: string, mood: string, note: string }[]>(() => {
    const saved = localStorage.getItem('dharaloka_emotions');
    return saved ? JSON.parse(saved) : [];
  });

  const save = () => {
    if (!selectedMood) return;
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood: selectedMood,
      note: note.trim()
    };
    const newHistory = [newEntry, ...history];
    setHistory(newHistory);
    localStorage.setItem('dharaloka_emotions', JSON.stringify(newHistory));
    setSelectedMood(null);
    setNote('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <h3 className="text-2xl font-serif italic">Bagaimana perasaan Anda saat ini?</h3>
        
        <div className="flex flex-wrap gap-4">
          {moods.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMood(m.id)}
              className={cn(
                "group relative flex flex-col items-center gap-2 p-6 rounded-3xl border transition-all",
                selectedMood === m.id 
                  ? "bg-teal border-teal text-forest" 
                  : "bg-forest/20 border-cream/10 text-sage hover:border-teal/50"
              )}
            >
              <span className="text-4xl group-hover:scale-125 transition-transform">{m.emoji}</span>
              <span className="text-xs font-bold uppercase tracking-wider">{m.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ada cerita di balik perasaan ini? (opsional)"
                className="w-full bg-forest/30 border border-cream/10 rounded-2xl p-4 text-cream focus:outline-none focus:border-teal/50 h-32 resize-none"
              />
              <button
                onClick={save}
                className="w-full bg-cream text-forest py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-teal transition-all"
              >
                 <Save className="w-5 h-5" /> Simpan Check-in
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-6">
         <div className="flex items-center gap-2 text-sage text-sm font-mono uppercase tracking-widest">
            <History className="w-4 h-4" />
            <span>Riwayat Emosi</span>
         </div>

         <div className="space-y-3 h-[500px] overflow-y-auto pr-2">
            {history.map((h) => {
              const mood = moods.find(m => m.id === h.mood);
              return (
                <div key={h.id} className="p-4 bg-forest/20 border border-cream/5 rounded-2xl flex items-center gap-4">
                   <div className="text-2xl">{mood?.emoji}</div>
                   <div className="flex-1">
                      <div className="flex justify-between items-center">
                         <span className="text-xs font-bold text-teal">{mood?.label}</span>
                         <span className="text-[10px] text-sage">{format(new Date(h.date), 'dd MMM')}</span>
                      </div>
                      <p className="text-sm text-cream/70 italic mt-1">{h.note || "Tanpa catatan."}</p>
                   </div>
                </div>
              );
            })}
            {history.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-sage opacity-40 italic">
                 <Calendar className="w-8 h-8 mb-2" />
                 <p>Belum ada catatan emosi.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}
