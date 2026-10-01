import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { GIRLFRIEND_CONFIG } from '@/src/data/girlfriendData';

interface NavbarProps {
  isMusicOn: boolean;
  onToggleMusic: () => void;
  kissCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMusicOn,
  onToggleMusic,
  kissCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-rose-100/90 transition-all">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 h-13 sm:h-14 flex items-center justify-between gap-2">
        {/* Zone 1: Brand title */}
        <a
          href="#top"
          className="text-sm sm:text-base font-bold text-rose-600 tracking-tight flex items-center gap-1.5 shrink-0 hover:opacity-90 transition-opacity"
        >
          <span className="text-base select-none">🌸</span>
          <span className="font-serif-display truncate max-w-[120px] xs:max-w-[160px] sm:max-w-none">
            {GIRLFRIEND_CONFIG.herName}
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-slate-600">
          <a
            href="#photos"
            className="hover:text-rose-600 transition-colors py-1.5 px-1 cursor-pointer whitespace-nowrap"
          >
            Photos
          </a>
          <a
            href="#letter"
            className="hover:text-rose-600 transition-colors py-1.5 px-1 cursor-pointer whitespace-nowrap"
          >
            Love Letter
          </a>
        </nav>

        {/* Zone 3: Interactive controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Virtual Kiss Counter */}
          <div
            title="Total virtual kisses sent"
            className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-rose-500 bg-rose-50 border border-rose-200/90 px-2 sm:px-2.5 py-1 rounded-full shadow-2xs select-none"
          >
            <span className="text-xs">💋</span>
            <span className="tabular-nums font-bold">{kissCount}</span>
          </div>

          {/* Sweet Music Toggle */}
          <button
            onClick={onToggleMusic}
            title={isMusicOn ? 'Mute sweet melody' : 'Play sweet melody'}
            className={`min-h-[34px] sm:min-h-[36px] px-2 sm:px-2.5 py-1 rounded-full border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              isMusicOn
                ? 'bg-rose-500 text-white border-rose-600 shadow-2xs animate-pulse'
                : 'bg-white text-slate-600 border-rose-200 hover:bg-rose-50 active:bg-rose-100'
            }`}
            aria-label="Toggle romantic music"
          >
            {isMusicOn ? (
              <Volume2 className="w-3.5 h-3.5 text-white" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="text-[11px] font-medium hidden xs:inline sm:inline">
              {isMusicOn ? 'Music On' : 'Music'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
