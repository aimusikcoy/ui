import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const questions = [
  { id: 1, text: "Saya sering merasa terburu-buru dari satu tugas ke tugas lain tanpa benar-benar hadir.", scores: [4, 3, 2, 1] },
  { id: 2, text: "Saya cenderung berjalan cepat untuk mencapai tujuan tanpa memperhatikan apa yang saya lewati.", scores: [4, 3, 2, 1] },
  { id: 3, text: "Saya kesulitan untuk tetap fokus pada apa yang terjadi di saat ini.", scores: [4, 3, 2, 1] },
  { id: 4, text: "Saya sering melamun saat melakukan sesuatu yang rutin.", scores: [4, 3, 2, 1] },
  { id: 5, text: "Saya tidak memperhatikan sensasi fisik ketegangan atau emosi sampai mereka menjadi kuat.", scores: [4, 3, 2, 1] },
  { id: 6, text: "Saya mengemudikan kendaraan secara 'autopilot' dan lupa sebagian perjalanan.", scores: [4, 3, 2, 1] },
  { id: 7, text: "Saya lupa nama orang segera setelah saya diperkenalkan.", scores: [4, 3, 2, 1] },
  { id: 8, text: "Saya makan tanpa benar-benar merasakan rasa atau tekstur makanan.", scores: [4, 3, 2, 1] },
  { id: 9, text: "Saya mudah terganggu oleh pikiran masa lalu atau masa depan.", scores: [4, 3, 2, 1] },
  { id: 10, text: "Saya merasa terjebak dalam emosi negatif untuk waktu yang lama.", scores: [4, 3, 2, 1] },
];

const options = ["Sangat Jarang", "Jarang", "Sering", "Sangat Sering"];

export default function MindfulnessQuiz({ lang }: { lang: 'id' | 'en' }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<number | null>(null);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    if (currentIdx < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentIdx(currentIdx + 1);
    } else {
      const total = newAnswers.reduce((a, b) => a + b, 0);
      setResult(total);
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setAnswers([]);
    setResult(null);
  };

  const getRecommendation = (score: number) => {
    if (score <= 15) return "Anda sudah memiliki kesadaran yang sangat baik. Pertahankan dengan meditasi rutin.";
    if (score <= 25) return "Tingkat kesadaran Anda moderat. Cobalah latihan pernapasan sejenak di sela kesibukan.";
    return "Anda mungkin sedang dalam tekanan tinggi. Mulailah dengan jeda 2 menit setiap jam untuk kembali ke saat ini.";
  };

  return (
    <div className="max-w-2xl mx-auto backdrop-blur-xl bg-forest/20 p-8 rounded-3xl border border-cream/10">
      <AnimatePresence mode="wait">
        {result === null ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center text-sm font-mono text-sage">
              <span>Pertanyaan {currentIdx + 1} / {questions.length}</span>
              <span>{Math.round(((currentIdx + 1) / questions.length) * 100)}%</span>
            </div>
            
            <h3 className="text-2xl font-medium text-cream leading-relaxed italic">
              "{questions[currentIdx].text}"
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(i + 1)}
                  className="w-full text-left px-6 py-4 rounded-xl bg-forest/40 hover:bg-teal/20 border border-cream/5 hover:border-teal/40 transition-all group flex justify-between items-center"
                >
                  <span className="text-sage group-hover:text-teal transition-colors">{opt}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-10"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal/20 text-teal mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-serif">Skor Anda: {result} / 40</h3>
            <p className="text-lg text-sage italic max-w-md mx-auto">
              {getRecommendation(result)}
            </p>
            <button
              onClick={reset}
              className="mt-6 flex items-center gap-2 mx-auto px-8 py-3 rounded-full bg-cream text-forest font-medium hover:bg-teal hover:text-forest transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Mulai Lagi
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
