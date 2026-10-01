import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { GIRLFRIEND_CONFIG } from '@/src/data/girlfriendData';
import { playCutePopSound } from '@/src/utils/soundEffects';
import { fireHeartConfetti } from '@/src/utils/confetti';

interface HeroSectionProps {
  onSendKiss: () => void;
  kissCount: number;
}

interface FloatingKiss {
  id: number;
  x: number;
  emoji: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSendKiss, kissCount }) => {
  const [floatingKisses, setFloatingKisses] = useState<FloatingKiss[]>([]);
  const [statementIndex, setStatementIndex] = useState(0);
  const quotes = GIRLFRIEND_CONFIG.bannerQuotes || [
    'You make my heart smile in ways no one else can 🌷',
  ];

  // Cycle cute statements every 3.8 seconds
  useEffect(() => {
    if (!quotes.length) return;
    const timer = setInterval(() => {
      setStatementIndex((prev) => (prev + 1) % quotes.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [quotes.length]);

  const handleNextQuote = () => {
    playCutePopSound();
    setStatementIndex((prev) => (prev + 1) % quotes.length);
  };

  const handleKissClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playCutePopSound();
    onSendKiss();

    // Fire cute confetti
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireHeartConfetti(x, y);

    // Floating kiss emojis
    const emojis = ['💋', '💖', '🌸', '✨', '🍓', '🥰', '💕'];
    const newKiss: FloatingKiss = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 120,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    };

    setFloatingKisses((prev) => [...prev.slice(-8), newKiss]);
    setTimeout(() => {
      setFloatingKisses((prev) => prev.filter((k) => k.id !== newKiss.id));
    }, 1200);
  };

  return (
    <section className="relative pt-8 pb-8 md:pt-14 md:pb-12 text-center overflow-hidden">
      {/* Soft gradient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-tr from-pink-200/40 via-rose-100/30 to-purple-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4">
        {/* Cute Kicker Tag */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-100/80 border border-rose-200/80 px-3.5 py-1 rounded-full mb-4 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>National Girlfriend Day</span>
          <span className="text-rose-400">·</span>
          <span>For My Favorite Person</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-3"
        >
          Happy Girlfriend Day, <br />
          <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 bg-clip-text text-transparent italic">
            {GIRLFRIEND_CONFIG.herName}
          </span>{' '}
          <span className="inline-block animate-heart-pulse">🌸</span>
        </motion.h1>

        {/* Sweet Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mb-6 font-light">
          {GIRLFRIEND_CONFIG.subtitle}
        </p>

        {/* Kiss Button */}
        <div className="relative inline-block mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleKissClick}
            className="px-6 sm:px-7 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm rounded-full shadow-md shadow-rose-200 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer mx-auto"
          >
            <Heart className="w-4 h-4 fill-white text-white animate-bounce" />
            <span>Send A Virtual Kiss</span>
            <span className="bg-white/25 px-2 py-0.5 rounded-full text-xs font-bold tabular-nums">
              {kissCount}
            </span>
          </motion.button>

          {/* Floating kisses animation */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
            <AnimatePresence>
              {floatingKisses.map((kiss) => (
                <motion.span
                  key={kiss.id}
                  initial={{ opacity: 1, y: 0, x: kiss.x, scale: 0.8 }}
                  animate={{ opacity: 0, y: -70, x: kiss.x * 1.3, scale: 1.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="absolute text-2xl select-none"
                >
                  {kiss.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* CUTE STATEMENTS ANIMATION (Directly below Kiss Button) */}
        <div className="h-16 flex items-center justify-center max-w-lg mx-auto px-4">
          <div
            onClick={handleNextQuote}
            className="cursor-pointer select-none transition-transform hover:scale-102 active:scale-98"
            title="Click for another sweet note ✨"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={statementIndex}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="text-center"
              >
                <p className="font-handwriting text-xl sm:text-2xl text-rose-700 font-semibold tracking-wide drop-shadow-xs">
                  "{quotes[statementIndex % quotes.length]}"
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="text-[10px] text-rose-400 font-medium flex items-center justify-center gap-1 mt-1 opacity-70 hover:opacity-100 transition-opacity">
              <span>Tap to see next message</span>
              <span>·</span>
              <span className="tabular-nums">
                {(statementIndex % quotes.length) + 1}/{quotes.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
