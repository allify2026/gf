import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X } from 'lucide-react';
import { GIRLFRIEND_CONFIG } from '@/src/data/girlfriendData';
import { playRomanticHarp, playCutePopSound } from '@/src/utils/soundEffects';
import { fireCelebrationConfetti } from '@/src/utils/confetti';

export const LoveLetterEnvelope: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasHugged, setHasHugged] = useState(false);

  const toggleEnvelope = () => {
    if (!isOpen) {
      playRomanticHarp();
    } else {
      playCutePopSound();
    }
    setIsOpen(!isOpen);
  };

  const handleHugBack = () => {
    playRomanticHarp();
    fireCelebrationConfetti();
    setHasHugged(true);
    setTimeout(() => setHasHugged(false), 3500);
  };

  return (
    <section id="letter" className="py-8 sm:py-14 md:py-18 relative px-3.5 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <span className="text-[11px] sm:text-xs font-semibold text-rose-500 tracking-wider uppercase">
            A Special Message Just For You
          </span>
          <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-slate-800 mt-1">
            Tap To Open Your Love Letter 💌
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5 max-w-sm sm:max-w-md mx-auto">
            I wrote down some words straight from my heart. Tap the wax seal to unfold it.
          </p>
        </div>

        {/* Envelope Container */}
        <div className="relative max-w-md sm:max-w-lg mx-auto">
          {!isOpen ? (
            /* Closed Envelope View */
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleEnvelope}
              className="relative cursor-pointer bg-gradient-to-br from-rose-200 via-pink-100 to-rose-200 border-2 border-rose-300/80 rounded-2xl p-6 sm:p-10 shadow-lg shadow-rose-200/50 group transition-all touch-manipulation"
            >
              {/* Decorative Envelope Lines */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-rose-300/25 to-transparent border-b border-rose-300/40" />
              </div>

              {/* Heart Wax Seal in Center */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-rose-600 to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-500/40 group-hover:scale-108 transition-transform duration-300 border-2 border-rose-200">
                  <Heart className="w-7 h-7 sm:w-9 sm:h-9 fill-white text-white animate-pulse" />
                </div>
                <span className="mt-3.5 font-serif-display text-base sm:text-lg font-bold text-rose-900">
                  For {GIRLFRIEND_CONFIG.herName}
                </span>
                <span className="text-[11px] sm:text-xs text-rose-600/90 font-medium mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-rose-500" />
                  Tap to break the seal & read
                </span>
              </div>
            </motion.div>
          ) : (
            /* Open Letter View */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-white paper-texture border border-rose-200 rounded-2xl p-5 sm:p-8 shadow-xl shadow-rose-200/60 text-left relative"
              >
                {/* Close Button */}
                <button
                  onClick={toggleEnvelope}
                  className="absolute top-3.5 right-3.5 p-1.5 rounded-full hover:bg-rose-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer touch-manipulation"
                  title="Fold back envelope"
                  aria-label="Fold letter back"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Stamp & Air Mail Badge */}
                <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-4 sm:mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">💌</span>
                    <div>
                      <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider block">
                        Love Letter
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-400">
                        Handcrafted with all my affection
                      </span>
                    </div>
                  </div>
                  <div className="border border-rose-300 bg-rose-50 px-2 py-0.5 rounded text-center rotate-3 shadow-2xs">
                    <span className="text-[9px] font-bold text-rose-700 uppercase tracking-widest block">
                      AIR MAIL
                    </span>
                    <span className="text-[10px]">❤️</span>
                  </div>
                </div>

                {/* Salutation */}
                <p className="font-handwriting text-2xl sm:text-3xl text-rose-800 font-bold mb-3 sm:mb-4">
                  {GIRLFRIEND_CONFIG.loveLetter.salutation}
                </p>

                {/* Paragraphs */}
                <div className="space-y-3 sm:space-y-4 text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed">
                  {GIRLFRIEND_CONFIG.loveLetter.paragraphs.map((p, idx) => (
                    <p key={idx} className="font-serif-display text-slate-700 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Sign-off */}
                <div className="mt-6 pt-3 sm:mt-7 sm:pt-4 border-t border-rose-100">
                  <p className="font-serif-display text-xs sm:text-sm text-slate-500 italic">
                    {GIRLFRIEND_CONFIG.loveLetter.closing}
                  </p>
                  <p className="font-handwriting text-2xl sm:text-3xl text-rose-600 font-bold mt-1">
                    {GIRLFRIEND_CONFIG.loveLetter.signature}
                  </p>
                </div>

                {/* Interactive Heart Button in Letter */}
                <div className="mt-5 flex flex-col sm:flex-row items-center gap-2.5 justify-center sm:justify-between pt-1">
                  <button
                    onClick={handleHugBack}
                    className="w-full sm:w-auto min-h-[42px] px-5 py-2.5 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white rounded-full text-xs sm:text-sm font-semibold shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation"
                  >
                    <Heart className="w-4 h-4 fill-white shrink-0" />
                    <span>{hasHugged ? 'Sent with a million kisses! 🥰' : 'I love you too! ❤️'}</span>
                  </button>

                  <button
                    onClick={toggleEnvelope}
                    className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer py-1.5 px-2 touch-manipulation"
                  >
                    Fold letter back
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};
