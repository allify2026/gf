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

  // Cycle cute statements every 4 seconds
  useEffect(() => {
    if (!quotes.length) return;
    const timer = setInterval(() => {
      setStatementIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  const handleNextQuote = () => {
    playCutePopSound();
    setStatementIndex((prev) => (prev + 1) % quotes.length);
  };

  const handleKissClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playCutePopSound();
    onSendKiss();

    // Confetti from button position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireHeartConfetti(x, y);

    // Floating kiss emojis with bounded mobile coordinates
    const emojis = ['💋', '💖', '🌸', '✨', '🍓', '🥰', '💕'];
    const newKiss: FloatingKiss = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 80,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    };

    setFloatingKisses((prev) => [...prev.slice(-6), newKiss]);
    setTimeout(() => {
      setFloatingKisses((prev) => prev.filter((k) => k.id !== newKiss.id));
    }, 1200);
  };

  return (
    <section id="top" className="relative pt-6 pb-6 sm:pt-12 sm:pb-10 text-center overflow-hidden">
      {/* Soft gradient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-pink-200/40 via-rose-100/30 to-purple-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Kicker Tag */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-rose-600 bg-rose-100/80 border border-rose-200/80 px-3 py-1 rounded-full mb-3.5 sm:mb-4 shadow-2xs"
        >
          <Sparkles className="w-3 h-3 text-rose-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>National Girlfriend Day</span>
          <span className="text-rose-300">·</span>
          <span>For My Favorite Person</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ textWrap: 'balance' }}
          className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-2.5 sm:mb-3"
        >
          Happy Girlfriend Day, <br />
          <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 bg-clip-text text-transparent italic inline-block">
            {GIRLFRIEND_CONFIG.herName}
          </span>{' '}
          <span className="inline-block animate-heart-pulse text-2xl sm:text-4xl">🌸</span>
        </motion.h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-base text-slate-600 max-w-sm sm:max-w-md mx-auto mb-6 px-1 font-light leading-relaxed">
          {GIRLFRIEND_CONFIG.subtitle}
        </p>

        {/* Virtual Kiss Button */}
        <div className="relative inline-block mb-5 sm:mb-6">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleKissClick}
            className="min-h-[46px] px-6 sm:px-7 py-2.5 sm:py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-xs sm:text-sm rounded-full shadow-md shadow-rose-200 hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer mx-auto touch-manipulation"
          >
            <Heart className="w-4 h-4 fill-white text-white animate-bounce shrink-0" />
            <span className="whitespace-nowrap">Send A Virtual Kiss</span>
            <span className="bg-white/25 px-2 py-0.5 rounded-full text-xs font-bold tabular-nums">
              {kissCount}
            </span>
          </motion.button>

          {/* Floating kiss emoji bursts */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-32 overflow-visible">
            <AnimatePresence>
              {floatingKisses.map((kiss) => (
                <motion.span
                  key={kiss.id}
                  initial={{ opacity: 1, y: 0, x: kiss.x, scale: 0.8 }}
                  animate={{ opacity: 0, y: -65, x: kiss.x * 1.2, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="absolute text-xl select-none"
                >
                  {kiss.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Cute Animated Statements Below Kiss Button */}
        <div className="min-h-[64px] sm:min-h-[56px] flex items-center justify-center max-w-md sm:max-w-lg mx-auto px-2">
          <div
            onClick={handleNextQuote}
            className="w-full cursor-pointer select-none bg-white/70 hover:bg-white/95 active:bg-rose-50/80 backdrop-blur-xs border border-rose-200/80 hover:border-rose-300 rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-2xs transition-all touch-manipulation"
            title="Tap for another sweet note ✨"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={statementIndex}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="text-center"
              >
                <p className="font-handwriting text-lg sm:text-2xl text-rose-700 font-semibold tracking-wide drop-shadow-xs leading-snug">
                  "{quotes[statementIndex % quotes.length]}"
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="text-[10px] text-rose-400 font-medium flex items-center justify-center gap-1 mt-1 opacity-75">
              <span>Tap for next note</span>
              <span>·</span>
              <span className="tabular-nums font-semibold">
                {(statementIndex % quotes.length) + 1}/{quotes.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
