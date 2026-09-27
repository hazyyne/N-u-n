import React from 'react';
import { ChefHat, Bookmark, Sparkles } from 'lucide-react';

interface NavbarProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  onScrollToTips: () => void;
  onScrollToSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoriteCount,
  onOpenFavorites,
  onScrollToTips,
  onScrollToSearch,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={onScrollToSearch}
          className="flex items-center gap-2 text-left group transition-transform active:scale-95"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500/20 transition-colors">
            <ChefHat className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
            Food Suggestion
          </span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={onScrollToSearch}
            className="hover:text-emerald-600 transition-colors cursor-pointer"
          >
            Tìm món ăn
          </button>
          <button
            onClick={onScrollToTips}
            className="hover:text-emerald-600 transition-colors cursor-pointer"
          >
            Mẹo nấu ăn sinh viên
          </button>
          <a
            href="#faq"
            className="hover:text-emerald-600 transition-colors"
          >
            Về ứng dụng
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenFavorites}
            className="relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            title="Món ăn đã lưu"
          >
            <Bookmark className="w-4 h-4 text-emerald-600" />
            <span>Món đã lưu</span>
            {favoriteCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
