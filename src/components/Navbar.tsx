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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 border-b border-rose-100/80 transition-all">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Zone 1: Brand element */}
        <div className="text-base font-bold text-rose-600 tracking-tight flex items-center gap-1.5">
          <span>🌸</span>
          <span className="font-serif-display">{GIRLFRIEND_CONFIG.herName}</span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-5 text-xs sm:text-sm font-medium text-slate-600">
          <a
            href="#photos"
            className="hover:text-rose-600 transition-colors cursor-pointer"
          >
            Photos
          </a>
          <a
            href="#letter"
            className="hover:text-rose-600 transition-colors cursor-pointer"
          >
            Love Letter
          </a>
        </nav>

        {/* Zone 3: Interactive controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Virtual Kiss Counter */}
          <div className="flex items-center gap-1 text-xs font-semibold text-rose-500 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-full shadow-2xs">
            <span>💋</span>
            <span className="tabular-nums">{kissCount}</span>
          </div>

          {/* Sweet Music Toggle */}
          <button
            onClick={onToggleMusic}
            title={isMusicOn ? 'Pause sweet melody' : 'Play sweet melody'}
            className={`px-2.5 py-1 rounded-full border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              isMusicOn
                ? 'bg-rose-500 text-white border-rose-600 shadow-2xs animate-pulse'
                : 'bg-white text-slate-600 border-rose-200 hover:bg-rose-50'
            }`}
            aria-label="Toggle romantic music"
          >
            {isMusicOn ? (
              <Volume2 className="w-3.5 h-3.5 text-white" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="text-[11px] font-medium hidden sm:inline">
              {isMusicOn ? 'Melody On' : 'Play Music'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
