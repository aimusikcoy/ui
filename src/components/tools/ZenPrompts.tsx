import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Star, Share2, Quote } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const prompts = {
  introspection: [
    "Jika hari ini adalah cerminan dari seluruh hidup Anda, bagian mana yang ingin Anda simpan?",
    "Apa satu hal yang Anda cemaskan sekarang yang tidak akan penting dalam 2 tahun?",
    "Di mana dalam tubuh Anda, Anda merasa paling 'hidup' hari ini?",
    "Apa suara yang paling menenangkan yang Anda dengar hari ini?",
    "Jika Anda bisa memaafkan satu bagian dari diri Anda, yang mana itu?"
  ],
  presence: [
    "Perhatikan 3 warna di sekitar Anda. Bagaimana mereka berinteraksi dengan cahaya?",
    "Jelaskan tekstur benda yang paling dekat dengan tangan kanan Anda.",
    "Berapa banyak suara berbeda yang bisa Anda dengar jika Anda diam selama 30 detik?",
    "Rasakan suhu udara di lubang hidung Anda saat menarik dan membuang napas.",
    "Amati satu objek statis selama 1 menit penuh seolah-olah Anda baru pertama melihatnya."
  ],
  wisdom: [
    "Air yang tenang hanya bisa memantulkan kebenaran saat ia tidak bergejolak.",
    "Bunga mekar pada waktunya, bukan pada waktu yang dipaksa.",
    "Hutan tidak bersuara, namun ia penuh dengan kehidupan yang selaras.",
    "Gunung tidak meminta perhatian, namun kehadirannya tak tergoyahkan.",
    "Laras adalah ketika hati, pikiran, dan langkah berada di satu garis yang sama."
  ]
};

export default function ZenPrompts() {
  const [currentPrompt, setCurrentPrompt] = useState<{ text: string, cat: string } | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('dharaloka_fav_prompts');
    return saved ? JSON.parse(saved) : [];
  });

  const generate = (category?: keyof typeof prompts) => {
    const cats = Object.keys(prompts) as (keyof typeof prompts)[];
    const cat = category || cats[Math.floor(Math.random() * cats.length)];
    const list = prompts[cat];
    const text = list[Math.floor(Math.random() * list.length)];
    setCurrentPrompt({ text, cat });
  };

  const toggleFav = () => {
    if (!currentPrompt) return;
    const newFavs = favorites.includes(currentPrompt.text)
      ? favorites.filter(f => f !== currentPrompt.text)
      : [...favorites, currentPrompt.text];
    setFavorites(newFavs);
    localStorage.setItem('dharaloka_fav_prompts', JSON.stringify(newFavs));
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-12">
      <div className="flex flex-wrap justify-center gap-4">
         {(Object.keys(prompts) as (keyof typeof prompts)[]).map(cat => (
           <button
             key={cat}
             onClick={() => generate(cat)}
             className="px-6 py-2 rounded-full border border-cream/10 bg-forest/20 text-xs font-bold uppercase tracking-widest text-sage hover:text-teal hover:border-teal/40 transition-all capitalize"
           >
             {cat}
           </button>
         ))}
      </div>

      <div className="relative h-64 bg-[#A8B5A2]/20 rounded-[2.5rem] border border-sage/30 flex flex-col justify-between p-8 overflow-hidden group">
          <div className="flex justify-between items-start">
             <h4 className="text-[10px] font-bold opacity-60 uppercase tracking-[0.2em] text-cream">Refleksi Sekejap</h4>
             <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse"></span>
          </div>
          
          <AnimatePresence mode="wait">
            {currentPrompt ? (
              <motion.div
                key={currentPrompt.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center px-6"
              >
                 <p className="text-xl md:text-2xl font-serif italic text-cream/90 leading-tight">
                   "{currentPrompt.text}"
                 </p>
              </motion.div>
            ) : (
              <div className="text-center opacity-40 italic font-serif text-lg">
                 Pilih kategori untuk memunculkan renungan.
              </div>
            )}
          </AnimatePresence>

          <div className="flex justify-center gap-4">
            <button 
              onClick={() => generate()}
              className="text-[10px] font-bold uppercase tracking-[0.2em] border border-cream/20 px-8 py-2.5 rounded-full hover:bg-cream/10 transition-all text-cream"
            >
              Ganti Pertanyaan
            </button>
            {currentPrompt && (
              <button 
                onClick={toggleFav}
                className={cn(
                  "p-2.5 rounded-full border border-cream/10 transition-all",
                  favorites.includes(currentPrompt.text) ? "text-yellow-400 border-yellow-400/30" : "text-sage hover:text-teal"
                )}
              >
                 <Star className={cn("w-4 h-4", favorites.includes(currentPrompt.text) && "fill-current")} />
              </button>
            )}
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="p-8 glass-card">
            <h4 className="text-sm font-bold uppercase tracking-tighter text-teal mb-4">Cara Menggunakan</h4>
            <p className="text-sage text-sm leading-relaxed italic">
              Jangan terburu-buru mencari jawaban. Bacalah prompt-nya, tarik napas 3 kali, dan biarkan pikiran Anda mengalir tanpa penilaian. Terkadang, pertanyaan lebih penting daripada jawaban.
            </p>
         </div>
         <div className="p-8 glass-card overflow-y-auto max-h-64">
            <h4 className="text-sm font-bold uppercase tracking-tighter text-teal mb-4">Favorit Anda ({favorites.length})</h4>
            <div className="space-y-4">
               {favorites.map(f => (
                 <p key={f} className="text-xs text-cream/70 italic border-l-2 border-teal/20 pl-4">{f}</p>
               ))}
               {favorites.length === 0 && <p className="text-xs text-sage italic">Belum ada favorit.</p>}
            </div>
         </div>
      </div>
    </div>
  );
}
