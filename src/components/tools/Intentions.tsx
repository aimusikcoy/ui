import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Compass, Heart, Anchor, Save, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { format } from 'date-fns';

export default function Intentions() {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('dharaloka_intentions');
    return saved ? JSON.parse(saved) : {
      morning: { intention: '', focus: '', gratitude: '' },
      evening: { win: '', learn: '', letGo: '' }
    };
  });
  const [showSaved, setShowSaved] = useState(false);

  const save = () => {
    localStorage.setItem('dharaloka_intentions', JSON.stringify(data));
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const update = (section: 'morning' | 'evening', field: string, val: string) => {
    setData({ ...data, [section]: { ...data[section], [field]: val } });
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex gap-4 mb-8 bg-forest/40 p-1 rounded-2xl border border-cream/5 w-fit mx-auto">
        <button
          onClick={() => setActiveTab('morning')}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all",
            activeTab === 'morning' ? "bg-cream text-forest shadow-lg shadow-cream/5" : "text-sage hover:text-cream"
          )}
        >
          <Sun className="w-4 h-4" /> Pagi (Niat)
        </button>
        <button
          onClick={() => setActiveTab('evening')}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all",
            activeTab === 'evening' ? "bg-cream text-forest shadow-lg shadow-cream/5" : "text-sage hover:text-cream"
          )}
        >
          <Moon className="w-4 h-4" /> Malam (Refleksi)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeTab === 'morning' ? (
          <>
            <TemplateItem
              id="m1" icon={<Compass className="w-5 h-5" />}
              title="Satu Niat Utama" desc="Apa kualitas batin yang ingin saya bawa hari ini?"
              val={data.morning.intention} onChange={(v) => update('morning', 'intention', v)}
            />
            <TemplateItem
              id="m2" icon={<Anchor className="w-5 h-5" />}
              title="Fokus Terpenting" desc="Satu hal yang jika selesai akan membuat hari ini bermakna."
              val={data.morning.focus} onChange={(v) => update('morning', 'focus', v)}
            />
            <TemplateItem
              id="m3" icon={<Heart className="w-5 h-5" />}
              title="Antisipasi Syukur" desc="Hal kecil apa yang saya nantikan hari ini?"
              val={data.morning.gratitude} onChange={(v) => update('morning', 'gratitude', v)}
            />
          </>
        ) : (
          <>
            <TemplateItem
              id="e1" icon={<CheckCircle2 className="w-5 h-5" />}
              title="Kemenangan Kecil" desc="Apapun itu, hargai satu pencapaian hari ini."
              val={data.evening.win} onChange={(v) => update('evening', 'win', v)}
            />
            <TemplateItem
              id="e2" icon={<BrainIcon className="w-5 h-5" />}
              title="Pelajaran Berharga" desc="Satu hal baru yang saya pahami tentang diri atau dunia."
              val={data.evening.learn} onChange={(v) => update('evening', 'learn', v)}
            />
            <TemplateItem
              id="e3" icon={<CloudIcon className="w-5 h-5" />}
              title="Lepaskan & Ikhlaskan" desc="Apa hal yang tidak perlu saya bawa ke hari esok?"
              val={data.evening.letGo} onChange={(v) => update('evening', 'letGo', v)}
            />
          </>
        )}
      </div>

      <div className="mt-12 flex justify-center flex-col items-center gap-4">
          <button
            onClick={save}
            className="group px-12 py-4 bg-teal text-forest rounded-full font-bold flex items-center gap-3 hover:bg-cream transition-all hover:scale-105 active:scale-95"
          >
            <Save className="w-5 h-5" /> Simpan {activeTab === 'morning' ? 'Niat' : 'Refleksi'}
          </button>
          
          <AnimatePresence>
            {showSaved && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-teal text-sm italic flex items-center gap-2"
              >
                 <CheckCircle2 className="w-4 h-4" /> Tersimpan secara lokal.
              </motion.p>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}

function TemplateItem({ id, icon, title, desc, val, onChange }: any) {
  return (
    <div className="glass-card !p-6 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-forest/40 flex items-center justify-center text-teal mb-4">
        {icon}
      </div>
      <h4 className="font-serif italic text-lg mb-1">{title}</h4>
      <p className="text-xs text-sage mb-4 px-4">{desc}</p>
      <textarea
        value={val}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-forest/30 border border-cream/5 rounded-xl p-3 text-cream text-sm focus:outline-none focus:border-teal/50 h-32 resize-none"
        placeholder="Mulai menulis di sini..."
      />
    </div>
  );
}

function BrainIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.125A9 9 0 1 0 12 5Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/></svg>
  );
}

function CloudIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.4-1.9-4.3-4.3-4.5h-.2l-.4-1C16.5 6.4 14.3 5 12 5c-3 0-5.5 2.4-5.5 5.5 0 .2.1.4.1.6l-.3.2C4.1 11.8 3 13.5 3 15.5 3 18.5 5.5 21 8.5 21h9"/><path d="m9 15 3 3 3-3"/><path d="M12 11v7"/></svg>
  );
}
