/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Menu, 
  X, 
  Globe, 
  LayoutDashboard, 
  Compass, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Info,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { translations, Language } from './constants/translations';
import { cn } from './lib/utils';

// Tool Components
import MindfulnessQuiz from './components/tools/Quiz';
import BreathingTimer from './components/tools/BreathingTimer';
import HabitTracker from './components/tools/HabitTracker';
import GratitudeJournal from './components/tools/GratitudeJournal';
import MindfulPomodoro from './components/tools/Pomodoro';
import FocusTest from './components/tools/FocusTest';
import BodyScan from './components/tools/BodyScan';
import EmotionWheel from './components/tools/EmotionWheel';
import PMR from './components/tools/PMR';
import BetterReflection from './components/tools/Reflection';
import ZenPrompts from './components/tools/ZenPrompts';
import Intentions from './components/tools/Intentions';
import Dashboard from './components/Dashboard';
import Insights from './components/Insights';

type Tab = 'hero' | 'dashboard' | 'tools' | 'philosophy' | 'insights' | 'waiting';

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(() => {
    const saved = localStorage.getItem('dharaloka_waitlist_count');
    return saved ? Number(saved) : 20468;
  });

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tools = [
    { id: 'quiz', component: <MindfulnessQuiz lang={lang} />, ...t.tools.quiz, icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'focus', component: <FocusTest />, ...t.tools.focus, icon: <Zap className="w-5 h-5" /> },
    { id: 'breathing', component: <BreathingTimer />, ...t.tools.breathing, icon: <Leaf className="w-5 h-5" /> },
    { id: 'bodyscan', component: <BodyScan />, ...t.tools.bodyscan, icon: <Compass className="w-5 h-5" /> },
    { id: 'pmr', component: <PMR />, ...t.tools.pmr, icon: <Info className="w-5 h-5" /> },
    { id: 'habits', component: <HabitTracker />, ...t.tools.habits, icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'gratitude', component: <GratitudeJournal />, ...t.tools.gratitude, icon: <Sparkles className="w-5 h-5" /> },
    { id: 'intentions', component: <Intentions />, ...t.tools.intentions, icon: <BookOpen className="w-5 h-5" /> },
    { id: 'prompts', component: <ZenPrompts />, ...t.tools.prompts, icon: <Globe className="w-5 h-5" /> },
    { id: 'pomodoro', component: <MindfulPomodoro />, ...t.tools.pomodoro, icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'emotions', component: <EmotionWheel />, ...t.tools.emotions, icon: <Users className="w-5 h-5" /> },
    { id: 'reflection', component: <BetterReflection />, ...t.tools.reflection, icon: <LayoutDashboard className="w-5 h-5" /> },
  ];

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    const newCount = waitlistCount + 1;
    setWaitlistCount(newCount);
    localStorage.setItem('dharaloka_waitlist_count', String(newCount));
    alert(lang === 'id' ? "Selamat! Anda telah terdaftar." : "Success! You have been registered.");
  };

  return (
    <div className="min-h-screen bg-zen-dark selection:bg-teal selection:text-forest overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-forest/20 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "bg-zen-dark/90 backdrop-blur-xl py-4 border-b border-sage/10" : "bg-transparent py-8"
      )}>
        <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => { setActiveTab('hero'); setActiveTool(null); }}
          >
            <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-forest group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-teal/20">
               <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl tracking-[0.2em] font-serif text-cream font-bold">DHARALOKA</h1>
              <p className="text-[9px] tracking-[0.3em] text-sage uppercase opacity-60">Aliran Kesadaran</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>{t.nav.dashboard}</NavLink>
            <NavLink active={activeTab === 'tools'} onClick={() => setActiveTab('tools')}>{t.nav.tools}</NavLink>
            <NavLink active={activeTab === 'philosophy'} onClick={() => setActiveTab('philosophy')}>{t.nav.philosophy}</NavLink>
            <NavLink active={activeTab === 'insights'} onClick={() => setActiveTab('insights')}>{t.nav.insights}</NavLink>
            <button 
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              className="p-2.5 rounded-full border border-sage/20 hover:bg-cream hover:text-forest transition-all"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveTab('waiting')}
              className="bg-teal text-forest px-8 py-3 rounded-full font-bold text-xs tracking-widest hover:bg-cream transition-all shadow-xl shadow-teal/10"
            >
              {t.nav.waitingList}
            </button>
          </div>

          <button className="md:hidden text-cream" onClick={() => setIsMenuOpen(true)}>
             <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-0 z-[100] bg-zen-dark flex flex-col p-8"
          >
             <div className="flex justify-between items-center mb-12">
                <span className="font-serif text-2xl italic">Dharaloka</span>
                <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
             </div>
             <div className="flex flex-col gap-8 text-3xl font-serif italic">
                <button onClick={() => { setActiveTab('dashboard'); setIsMenuOpen(false); }}>{t.nav.dashboard}</button>
                <button onClick={() => { setActiveTab('tools'); setIsMenuOpen(false); }}>{t.nav.tools}</button>
                <button onClick={() => { setActiveTab('philosophy'); setIsMenuOpen(false); }}>{t.nav.philosophy}</button>
                <button onClick={() => { setActiveTab('insights'); setIsMenuOpen(false); }}>{t.nav.insights}</button>
                <button onClick={() => { setActiveTab('waiting'); setIsMenuOpen(false); }}>{t.nav.waitingList}</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-32 pb-20">
        <AnimatePresence mode="wait">
          {activeTab === 'hero' && (
            <motion.section 
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-6 min-h-[70vh] flex flex-col justify-center items-center text-center space-y-10"
            >
               <motion.div
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="space-y-4"
               >
                  <span className="text-teal font-mono tracking-[0.5em] text-xs uppercase font-bold">{t.tagline}</span>
                  <h1 className="text-7xl md:text-9xl font-serif italic font-bold tracking-tighter text-cream leading-tight">
                     Dharaloka
                  </h1>
                  <p className="text-xl md:text-2xl text-sage font-light italic max-w-2xl mx-auto leading-relaxed">
                    {t.hero.subtitle}
                  </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="flex flex-col md:flex-row gap-6 pt-10"
               >
                  <button 
                    onClick={() => setActiveTab('tools')}
                    className="px-12 py-5 bg-teal text-forest rounded-full font-bold text-lg hover:bg-cream transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-teal/20"
                  >
                    Eksplorasi Alat Zen
                  </button>
                  <button className="px-12 py-5 border border-cream/20 rounded-full font-bold text-lg hover:border-teal transition-all group flex items-center gap-2">
                    Pelajari Filosofi 
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
               </motion.div>

               <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
                  <FeatureBox icon={<Compass />} title="Kejelasan Batin" desc="Mengurangi noise layar dan pikiran untuk fokus yang murni." />
                  <FeatureBox icon={<Sparkles />} title="Estetika Keheningan" desc="Desain yang menenangkan jiwa, memanjakan mata." />
                  <FeatureBox icon={<ShieldCheck />} title="Privasi Mutlak" desc="Data Anda adalah milik Anda. Sepenuhnya lokal di browser." />
               </div>
            </motion.section>
          )}

          {activeTab === 'dashboard' && (
            <motion.section 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto px-6 space-y-12"
            >
               <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-cream/5 pb-10">
                  <div className="space-y-2 text-center md:text-left">
                     <h2 className="text-5xl font-serif italic">{t.nav.dashboard}</h2>
                     <p className="text-sage">Rekam jejak aliran kesadaran Anda.</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="bg-forest/40 px-6 py-4 rounded-3xl border border-cream/5 flex flex-col items-center">
                        <span className="text-[10px] uppercase font-bold text-teal tracking-widest">Level Zen</span>
                        <span className="text-2xl font-serif mt-1 italic">Initiate</span>
                     </div>
                  </div>
               </div>
               <Dashboard />
            </motion.section>
          )}

          {activeTab === 'tools' && (
            <motion.section 
              key="tools"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-7xl mx-auto px-6 space-y-12"
            >
               {!activeTool ? (
                 <>
                   <div className="text-center space-y-2 mb-16">
                      <h2 className="text-5xl font-serif italic">Perpustakaan Zen</h2>
                      <p className="text-sage">Pilih pintu menuju kedamaian Anda.</p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tools.map((tool) => (
                        <div 
                          key={tool.id} 
                          onClick={() => setActiveTool(tool.id)}
                          className="glass-card group cursor-pointer hover:bg-teal/10 hover:-translate-y-2"
                        >
                           <div className="w-12 h-12 rounded-2xl bg-forest/40 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-forest transition-all mb-6">
                              {tool.icon}
                           </div>
                           <h3 className="text-2xl font-serif italic mb-2 tracking-tight">{tool.title}</h3>
                           <p className="text-sm text-sage leading-relaxed">{tool.desc}</p>
                           <div className="mt-6 flex items-center gap-2 text-xs font-bold text-teal opacity-0 group-hover:opacity-100 transition-opacity">
                              Buka Alat <ChevronRight className="w-3 h-3" />
                           </div>
                        </div>
                      ))}
                   </div>
                 </>
               ) : (
                 <div className="space-y-8">
                    <button 
                      onClick={() => setActiveTool(null)}
                      className="flex items-center gap-2 text-sage hover:text-teal transition-colors font-mono text-xs uppercase tracking-widest"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" /> Kembali ke Daftar
                    </button>
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                      {tools.find(t => t.id === activeTool)?.component}
                    </div>
                 </div>
               )}
            </motion.section>
          )}

          {activeTab === 'philosophy' && (
             <motion.section key="philosophy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-6 text-center space-y-16">
                <div className="space-y-4">
                   <h2 className="text-6xl font-serif italic">The DHARA Way</h2>
                   <p className="text-xl text-sage italic">"Flow is the natural state. Resistance is the modern habit."</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                   <div className="space-y-4">
                      <h4 className="text-2xl font-serif italic text-teal">Kesederhanaan Radikal</h4>
                      <p className="text-cream/80 leading-relaxed italic font-serif">Di Dharaloka, kami percaya bahwa setiap piksel adalah gangguan jika ia tidak melayani tujuan. Kami menghapus yang tidak perlu untuk menyisakan ruang bagi jiwa.</p>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-2xl font-serif italic text-teal">Alur Alami</h4>
                      <p className="text-cream/80 leading-relaxed italic font-serif">Hidup bukan tentang menaklukkan, tapi tentang menyelaraskan. Alat kami dirancang untuk mengalir bersama ritme biologis Anda, bukan melawannya.</p>
                   </div>
                </div>
                <div className="p-12 glass-card">
                   <p className="text-2xl font-serif italic text-cream leading-relaxed">
                     "Dharaloka bukan sekadar studio desain. Ini adalah eksperimen untuk melihat apakah teknologi bisa menjadi jembatan menuju keheningan, alih-alih menjadi penghalangnya."
                   </p>
                </div>
             </motion.section>
          )}

          {activeTab === 'insights' && (
             <motion.section key="insights" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 space-y-12">
                <div className="text-center space-y-4 mb-20">
                   <div className="inline-flex items-center gap-3 bg-teal/5 text-teal border border-teal/20 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em]">
                      <BookOpen className="w-3 h-3" /> EKSPLORASI PENGETAHUAN
                   </div>
                   <h2 className="text-5xl md:text-6xl font-serif italic text-cream">Wawasan Zen</h2>
                   <p className="text-sage max-w-xl mx-auto italic">Pahami sains dan filosofi di balik ketenangan batin Anda.</p>
                </div>
                <Insights />
             </motion.section>
          )}

          {activeTab === 'waiting' && (
             <motion.section key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-6 text-center space-y-12 py-20">
                <div className="space-y-4">
                   <div className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-teal/20">
                      <div className="w-2 h-2 rounded-full bg-teal animate-ping" />
                      Akses Eksklusif
                   </div>
                   <h2 className="text-6xl font-serif italic leading-tight">Jadilah Bagian dari Aliran</h2>
                   <p className="text-xl text-sage max-w-xl mx-auto">Kami sedang membangun masa depan ekosistem kesadaran. Bergabunglah untuk mendapatkan akses prioritas dan wawasan desain eksklusif.</p>
                </div>

                <form onSubmit={handleJoinWaitlist} className="max-w-md mx-auto space-y-4">
                   <input 
                    type="email" 
                    required 
                    placeholder={lang === 'id' ? "Alamat email Anda..." : "Your email address..."}
                    className="w-full bg-forest/40 border border-cream/10 rounded-2xl px-6 py-4 text-cream placeholder:text-sage focus:outline-none focus:border-teal/50 text-lg"
                   />
                   <button className="w-full bg-cream text-forest py-5 rounded-2xl font-bold text-lg hover:bg-teal transition-all shadow-2xl shadow-teal/20">
                      Masuk Daftar Tunggu
                   </button>
                </form>

                <div className="pt-8">
                   <p className="text-sm font-mono text-sage tracking-widest">{waitlistCount.toLocaleString('id-ID')} JIWA TELAH BERGABUNG</p>
                </div>
             </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-cream/5 py-20 mt-20">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2 space-y-6 text-center md:text-left">
               <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-8 h-8 bg-teal rounded-full flex items-center justify-center text-forest"><Leaf className="w-4 h-4" /></div>
                  <span className="font-serif text-xl italic font-bold">Dharaloka</span>
               </div>
               <p className="text-sage italic max-w-sm">Designing tools for the mindful observer of life. A professional sanctuary for digital well-being.</p>
               <div className="flex gap-6 justify-center md:justify-start">
                  <a href="#" className="text-sage hover:text-teal transition-colors">Twitter</a>
                  <a href="#" className="text-sage hover:text-teal transition-colors">Instagram</a>
                  <a href="#" className="text-sage hover:text-teal transition-colors">Notes</a>
               </div>
            </div>
            <div className="space-y-4 text-center md:text-left">
               <h4 className="text-xs font-bold uppercase tracking-widest text-cream">Situs</h4>
               <ul className="space-y-2 text-sm text-sage italic">
                  <li><button onClick={() => setActiveTab('tools')}>Alat Zen</button></li>
                  <li><button onClick={() => setActiveTab('philosophy')}>Filosofi</button></li>
                  <li><button onClick={() => setActiveTab('insights')}>Wawasan</button></li>
               </ul>
            </div>
            <div className="space-y-4 text-center md:text-left">
               <h4 className="text-xs font-bold uppercase tracking-widest text-cream">Legal</h4>
               <p className="text-[10px] text-sage/60 leading-relaxed italic">Platform ini berjalan sepenuhnya di browser Anda. Tidak ada data pribadi yang dikumpulkan atau dikirim ke server luar guna menjaga privasi mutlak Anda.</p>
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-6 text-center mt-20 opacity-30 text-[10px] font-mono tracking-widest">
            © 2026 DHARALOKA • ALIRAN KESADARAN YANG SELARAS
         </div>
      </footer>
    </div>
  );
}

function NavLink({ active, children, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "nav-link flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all",
        active ? "text-cream opacity-100" : "text-sage opacity-50 hover:opacity-100"
      )}
    >
      <span className={cn(
        "w-1.5 h-1.5 rounded-full transition-all",
        active ? "bg-teal scale-100" : "bg-transparent border border-sage scale-75"
      )}></span>
      {children}
    </button>
  );
}

function FeatureBox({ icon, title, desc }: any) {
  return (
    <div className="space-y-4 p-8 glass-card border-sage/10 bg-forest/20 hover:bg-forest/30 transition-all">
       <div className="w-12 h-12 rounded-2xl bg-teal/10 text-teal flex items-center justify-center shadow-lg">
          {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
       </div>
       <h4 className="text-xl font-serif italic text-cream">{title}</h4>
       <p className="text-xs text-sage leading-relaxed italic opacity-80">{desc}</p>
    </div>
  );
}
