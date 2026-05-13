import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trash2, Calendar, Search, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/src/lib/utils';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: string;
}

export default function GratitudeJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('dharaloka_journal');
    return saved ? JSON.parse(saved) : [];
  });
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('dharaloka_journal', JSON.stringify(entries));
  }, [entries]);

  const saveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: content.trim()
    };
    setEntries([newEntry, ...entries]);
    setContent('');
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const filteredEntries = entries.filter(e => 
    e.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Editor Side */}
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-card !p-8">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-2xl bg-teal/20 text-teal flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
             </div>
             <div>
                <h3 className="font-serif text-xl italic">Hari ini saya bersyukur atas...</h3>
                <p className="text-xs text-sage">Tuliskan 1-3 hal kecil atau besar.</p>
             </div>
          </div>

          <form onSubmit={saveEntry} className="space-y-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Bernapas sejenak, rasakan momennya, lalu tulis..."
              className="w-full h-40 bg-forest/20 border border-cream/10 rounded-2xl p-4 text-cream placeholder:text-sage focus:outline-none focus:border-teal/50 resize-none leading-relaxed"
            />
            <button
              type="submit"
              disabled={!content.trim()}
              className="w-full bg-cream text-forest py-4 rounded-2xl font-semibold hover:bg-teal transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Simpan Momen
            </button>
          </form>
        </div>

        <div className="p-6 bg-sage/5 rounded-3xl border border-sage/10 italic text-sage text-sm leading-relaxed">
          "Dalam kehidupan sehari-hari, kita jarang menyadari bahwa kita menerima jauh lebih banyak daripada yang kita berikan, dan hanya dengan rasa syukur hidup kita menjadi kaya."
        </div>
      </div>

      {/* History Side */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari memori syukur..."
              className="w-full bg-forest/20 border border-cream/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-teal/50"
            />
          </div>
          <div className="px-4 py-2 rounded-xl bg-forest/40 border border-cream/5 flex items-center gap-2 text-xs text-sage">
             <BookOpen className="w-3 h-3" />
             <span>{entries.length} Entri</span>
          </div>
        </div>

        <div className="relative h-[600px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-teal/20">
          <AnimatePresence initial={false}>
            {filteredEntries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-forest/30 border border-cream/10 rounded-2xl p-6 hover:bg-forest/40 transition-colors"
              >
                 <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-teal/70 uppercase tracking-widest">
                       <Calendar className="w-3 h-3" />
                       {format(new Date(entry.date), 'dd MMM yyyy • HH:mm')}
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-red-400/50 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
                 <p className="text-cream/90 leading-relaxed italic font-serif text-lg">"{entry.content}"</p>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredEntries.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-sage opacity-50 space-y-4">
              <Sparkles className="w-12 h-12 stroke-1" />
              <p>Belum ada memori terukir.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
