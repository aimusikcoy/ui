import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, BookOpen, ExternalLink, ScrollText } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: React.ReactNode;
  sources: { name: string; url: string }[];
}

const articles: Article[] = [
  {
    id: 'breathing-science',
    title: 'Sains di Balik Teknik Pernapasan 4-7-8',
    category: 'Sains',
    date: '12 Mei 2026',
    readTime: '5 min',
    excerpt: 'Mengapa menahan napas selama 7 detik dapat menenangkan sistem saraf Anda secara instan?',
    content: (
      <div className="space-y-4">
        <p>Teknik pernapasan 4-7-8, yang dipopulerkan oleh Dr. Andrew Weil, sering disebut sebagai "obat penenang alami" untuk sistem saraf. Teknik ini bekerja dengan cara menyeimbangkan sistem saraf otonom.</p>
        <h4 className="text-teal font-serif italic text-lg">Bagaimana Ini Bekerja?</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>4 Detik Tarik Napas:</strong> Memaksa asupan oksigen yang teratur.</li>
          <li><strong>7 Detik Tahan:</strong> Memungkinkan oksigen mengisi aliran darah sepenuhnya dan membantu menstabilkan detak jantung.</li>
          <li><strong>8 Detik Buang Napas:</strong> Mengaktifkan Sistem Saraf Parasimpatik (Vagus Nerve), yang secara biologis memberitahu tubuh untuk rileks.</li>
        </ul>
        <p>Praktik rutin dapat membantu mengurangi kecemasan, meningkatkan kualitas tidur, dan mengelola kemarahan.</p>
      </div>
    ),
    sources: [
      { name: "Dr. Andrew Weil - 4-7-8 Breathing", url: "https://www.drweil.com/health-wellness/body-mind-spirit/stress-anxiety/breathing-exercises-4-7-8-breath/" },
      { name: "Healthline - Science of Deep Breathing", url: "https://www.healthline.com/health/4-7-8-breathing" }
    ]
  },
  {
    id: 'monotasking',
    title: 'Seni Monotasking di Era Distraksi',
    category: 'Produktivitas',
    date: '10 Mei 2026',
    readTime: '6 min',
    excerpt: 'Multitasking adalah mitos yang menurunkan IQ fungsional Anda. Pelajari cara kembali ke fokus tunggal.',
    content: (
      <div className="space-y-4">
        <p>Otak manusia tidak dirancang untuk memproses beberapa tugas kognitif berat secara bersamaan. Apa yang kita sebut multitasking sebenarnya adalah "context switching" — perpindahan fokus yang sangat cepat yang menghabiskan energi otak.</p>
        <blockquote className="border-l-2 border-teal pl-4 italic text-sage">
          "Orang yang multitasking sebenarnya melakukan tugas 40% lebih lambat dan membuat lebih banyak kesalahan."
        </blockquote>
        <h4 className="text-teal font-serif italic text-lg">Langkah Praktis Monotasking:</h4>
        <p>Mulailah dengan "Time Blocking". Berikan 25 menit penuh hanya untuk satu tugas (Teknik Pomodoro). Jauhkan ponsel dari jangkauan pandangan, karena kehadirannya saja sudah menurunkan kapasitas memori kerja Anda.</p>
      </div>
    ),
    sources: [
      { name: "Stanford Study on Multitasking", url: "https://news.stanford.edu/2009/08/24/multitask-082409/" },
      { name: "American Psychological Association", url: "https://www.apa.org/research/action/multitask" }
    ]
  },
  {
    id: 'zen-philosophy',
    title: 'Wabi-Sabi: Menghargai Ketidaksempurnaan',
    category: 'Filosofi',
    date: '08 Mei 2026',
    readTime: '7 min',
    excerpt: 'Menemukan keindahan dalam hal-hal yang tidak sempurna, tidak kekal, dan tidak lengkap.',
    content: (
      <div className="space-y-4">
        <p>Wabi-sabi adalah pandangan dunia Jepang yang berpusat pada penerimaan atas kefanaan dan ketidaksempurnaan. Estetikanya terkadang dijelaskan sebagai keindahan yang "tidak sempurna, tidak kekal, dan tidak lengkap".</p>
        <p>Dalam konteks kehidupan modern digital yang menuntut kesempurnaan (filter medsos, sukses instan), Wabi-sabi mengajarkan kita untuk:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Menerima proses penuaan dan kerusakan fisik sebagai tanda cerita kehidupan.</li>
          <li>Menghargai kesederhanaan di atas kemewahan yang berlebihan.</li>
          <li>Menyadari bahwa segala sesuatu sedang dalam proses "menjadi" atau "meluruh".</li>
        </ul>
      </div>
    ),
    sources: [
      { name: "Wabi Sabi: For Artists, Designers, Poets & Philosophers - Leonard Koren", url: "#" },
      { name: "The School of Life - Wabi-sabi", url: "https://www.theschooloflife.com/article/wabi-sabi/" }
    ]
  },
  {
    id: 'digital-detox',
    title: 'Dopamin Fasting: Menata Ulang Kesenangan',
    category: 'Psikologi',
    date: '05 Mei 2026',
    readTime: '4 min',
    excerpt: 'Bagaimana layar gadget memanipulasi hormon kebahagiaan Anda dan cara mengambil alih kembali.',
    content: (
      <div className="space-y-4">
        <p>Paparan terus-menerus terhadap notifikasi, like, dan scroll tak terbatas menciptakan lonjakan dopamin yang tidak alami. Ini membuat aktivitas normal (membaca buku, berjalan kaki) terasa membosankan karena otak Anda terbiasa dengan rangsangan tinggi.</p>
        <p><strong>Dopamin Fasting</strong> bukan berarti berhenti merasa senang, tapi memberi jeda pada perilaku impulsif agar reseptor otak Anda kembali sensitif terhadap kebahagiaan-kebahagiaan kecil yang bermakna.</p>
      </div>
    ),
    sources: [
      { name: "Dr. Cameron Sepah - Dopamine Fasting 2.0", url: "https://www.drcameronsopah.com/dopamine-fasting" },
      { name: "Healthline - What to know about Dopamine Fasting", url: "https://www.healthline.com/health/dopamine-fasting" }
    ]
  }
];

export default function Insights() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeArticle = articles.find(a => a.id === selectedId);

  return (
    <div className="max-w-6xl mx-auto py-10">
      <AnimatePresence mode="wait">
        {!selectedId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedId(article.id)}
                className="glass-card group cursor-pointer hover:border-teal/30 flex flex-col h-full"
              >
                <div className="flex justify-between text-[10px] font-mono text-teal uppercase tracking-[0.2em] mb-4 font-bold">
                  <span>{article.category}</span>
                  <span className="opacity-40">{article.readTime}</span>
                </div>
                <h3 className="text-2xl font-serif italic mb-4 group-hover:text-teal transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-xs text-sage leading-relaxed italic mb-8 flex-1">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-teal transition-all group-hover:translate-x-2">
                  BACA SELENGKAPNYA <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="article"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-3xl mx-auto space-y-12"
          >
            <button
              onClick={() => setSelectedId(null)}
              className="flex items-center gap-2 text-sage hover:text-teal transition-colors font-mono text-[10px] uppercase tracking-[0.2em]"
            >
              <ChevronLeft className="w-4 h-4" /> Kembali ke Wawasan
            </button>

            <header className="space-y-6">
              <div className="flex items-center gap-4 text-xs font-mono text-teal uppercase tracking-widest font-bold">
                 <span>{activeArticle?.category}</span>
                 <span className="w-1 h-1 rounded-full bg-sage/30"></span>
                 <span className="text-sage">{activeArticle?.date}</span>
                 <span className="w-1 h-1 rounded-full bg-sage/30"></span>
                 <span className="text-sage">{activeArticle?.readTime} read</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif italic text-cream leading-tight">
                {activeArticle?.title}
              </h1>
            </header>

            <article className="prose prose-invert max-w-none text-cream/90 leading-relaxed font-serif text-lg italic space-y-6">
               {activeArticle?.content}
            </article>

            <div className="pt-12 border-t border-sage/10">
               <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-4 flex items-center gap-2">
                  <ScrollText className="w-4 h-4" /> Sumber & Referensi
               </h4>
               <ul className="space-y-3">
                  {activeArticle?.sources.map((source, i) => (
                    <li key={i}>
                       <a
                         href={source.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center gap-2 text-sm text-sage hover:text-teal transition-colors group"
                       >
                          <span className="w-1.5 h-1.5 rounded-full bg-sage/20 group-hover:bg-teal"></span>
                          {source.name}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </a>
                    </li>
                  ))}
               </ul>
            </div>

            <div className="py-12 flex justify-center">
               <button
                 onClick={() => setSelectedId(null)}
                 className="px-10 py-4 bg-forest/30 border border-teal/20 rounded-full text-xs font-bold tracking-widest hover:bg-teal/10 transition-all text-teal uppercase"
               >
                 Selesai Membaca
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
