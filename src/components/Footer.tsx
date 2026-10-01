import React from 'react';
import { Heart } from 'lucide-react';
import { GIRLFRIEND_CONFIG } from '@/src/data/girlfriendData';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 sm:py-12 border-t border-rose-100/90 bg-white/60 backdrop-blur-xs text-center text-slate-500 relative z-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Heart Icon cluster */}
        <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3">
          <span className="text-lg sm:text-xl select-none">🌸</span>
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500 animate-heart-pulse" />
          <span className="text-lg sm:text-xl select-none">🍓</span>
        </div>

        <p className="font-handwriting text-xl sm:text-3xl text-rose-700 font-bold mb-1.5 sm:mb-2">
          "Every day with you is my favorite day."
        </p>

        <p className="text-xs text-slate-500 max-w-xs sm:max-w-sm mx-auto mb-3.5 sm:mb-4 font-light leading-relaxed">
          Dedicated to {GIRLFRIEND_CONFIG.herName} with endless love, late-night giggles, sweet cuddles, and forehead kisses.
        </p>

        <div className="text-[10px] sm:text-[11px] text-slate-400 flex items-center justify-center gap-2 font-medium">
          <span>Made with love for Girlfriend Day</span>
          <span>·</span>
          <span>Forever & Always 💕</span>
        </div>
      </div>
    </footer>
  );
};
