import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check, Trash2, Calendar as CalIcon, Flame } from 'lucide-react';
import { format, isToday, startOfToday, subDays } from 'date-fns';
import { cn } from '@/src/lib/utils';
import confetti from 'canvas-confetti';

interface Habit {
  id: string;
  name: string;
  history: string[]; // dates in YYYY-MM-DD
}

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('dharaloka_habits');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Meditasi Pagi', history: [] },
      { id: '2', name: 'Membaca Buku', history: [] }
    ];
  });
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    localStorage.setItem('dharaloka_habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    setHabits([...habits, { id: Date.now().toString(), name: newHabit, history: [] }]);
    setNewHabit('');
  };

  const toggleHabit = (id: string) => {
    const today = format(startOfToday(), 'yyyy-MM-dd');
    setHabits(habits.map(h => {
      if (h.id === id) {
        const isDone = h.history.includes(today);
        const newHistory = isDone 
          ? h.history.filter(d => d !== today)
          : [...h.history, today];
        
        if (!isDone) {
          confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.8 },
            colors: ['#4ECDC4', '#A8B5A2', '#F8F1E3']
          });
        }
        return { ...h, history: newHistory };
      }
      return h;
    }));
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const getStreak = (history: string[]) => {
    let streak = 0;
    let checkDate = startOfToday();
    
    // Convert to set for O(1) lookup
    const historySet = new Set(history);

    while (historySet.has(format(checkDate, 'yyyy-MM-dd'))) {
      streak++;
      checkDate = subDays(checkDate, 1);
    }
    return streak;
  };

  const last7Days = Array.from({ length: 7 }).map((_, i) => subDays(startOfToday(), i)).reverse();

  return (
    <div className="space-y-8">
      <form onSubmit={addHabit} className="flex gap-2">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Tambah kebiasaan baru..."
          className="flex-1 bg-forest/40 border border-cream/10 rounded-xl px-4 py-3 text-cream placeholder:text-sage focus:outline-none focus:border-teal/50"
        />
        <button type="submit" className="bg-teal text-forest p-3 rounded-xl hover:bg-cream transition-colors">
          <Plus className="w-6 h-6" />
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {habits.map((habit) => {
            const streak = getStreak(habit.history);
            const isDoneToday = habit.history.includes(format(startOfToday(), 'yyyy-MM-dd'));

            return (
              <motion.div
                key={habit.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card !p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all border",
                      isDoneToday ? "bg-teal text-forest border-teal" : "border-cream/10 text-sage hover:border-teal/50"
                    )}
                  >
                    {isDoneToday ? <Check className="w-6 h-6 stroke-[3px]" /> : <div className="w-2 h-2 rounded-full bg-sage" />}
                  </button>
                  <div>
                    <h4 className="text-lg font-medium text-cream">{habit.name}</h4>
                    <div className="flex items-center gap-2 text-xs font-mono text-sage">
                      <Flame className={cn("w-3 h-3", streak > 0 ? "text-orange-400" : "text-sage")} />
                      <span>{streak} Hari Beruntun</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 bg-forest/30 p-2 rounded-xl border border-cream/5">
                    {last7Days.map((date) => {
                      const dateStr = format(date, 'yyyy-MM-dd');
                      const done = habit.history.includes(dateStr);
                      return (
                        <div
                          key={dateStr}
                          title={format(date, 'MMM d')}
                          className={cn(
                            "w-6 h-6 rounded-md flex items-center justify-center text-[8px] font-mono",
                            done ? "bg-teal/40 text-teal border border-teal/20" : "bg-forest/50 text-sage/40"
                          )}
                        >
                          {format(date, 'd')}
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="p-2 text-red-400/50 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
