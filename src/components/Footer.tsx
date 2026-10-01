import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { GIRLFRIEND_CONFIG } from '@/src/data/girlfriendData';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-rose-100/80 bg-white/50 backdrop-blur-xs text-center text-slate-500 relative z-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Heart Icon cluster */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-xl">🌸</span>
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-heart-pulse" />
          <span className="text-xl">🍓</span>
        </div>

        <p className="font-handwriting text-2xl sm:text-3xl text-rose-700 font-bold mb-2">
          "Every day with you is my favorite day."
        </p>

        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4 font-light">
          Dedicated to {GIRLFRIEND_CONFIG.herName} with endless love, late-night giggles, sweet cuddles, and forehead kisses.
        </p>

        <div className="text-[11px] text-slate-400 flex items-center justify-center gap-2">
          <span>Made with love for Girlfriend Day</span>
          <span>·</span>
          <span>Forever & Always 💕</span>
        </div>
      </div>
    </footer>
  );
};
