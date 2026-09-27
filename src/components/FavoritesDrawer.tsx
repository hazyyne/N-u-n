import React from 'react';
import { X, Trash2, Clock, Utensils, Bookmark } from 'lucide-react';
import { Dish } from '../types/dish';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Dish[];
  onRemoveFavorite: (id: string) => void;
  onSelectDish: (dish: Dish) => void;
  onClearFavorites: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectDish,
  onClearFavorites,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-emerald-600 fill-current" />
              <h2 className="text-base font-bold text-slate-900">
                Món ăn đã lưu ({favorites.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {favorites.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <Bookmark className="w-12 h-12 stroke-[1.5] text-slate-300 mb-3" />
                <p className="text-sm font-semibold text-slate-600">
                  Chưa có món ăn nào được lưu
                </p>
                <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
                  Bấm biểu tượng lưu trên thẻ món ăn để giữ lại những món bạn thích nhất!
                </p>
              </div>
            ) : (
              favorites.map((dish) => (
                <div
                  key={dish.id}
                  className="group p-3 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white hover:bg-slate-50 transition-all flex items-center justify-between gap-3"
                >
                  <div
                    onClick={() => {
                      onSelectDish(dish);
                      onClose();
                    }}
                    className="flex-1 cursor-pointer min-w-0"
                  >
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 truncate">
                      {dish.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span className="tabular-nums">{dish.timeText}</span>
                      </span>
                      <span>·</span>
                      <span className="text-slate-600">{dish.budgetEstimate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectDish(dish);
                        onClose();
                      }}
                      className="p-1.5 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                      title="Xem công thức"
                    >
                      <Utensils className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveFavorite(dish.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Xóa khỏi danh sách"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {favorites.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={onClearFavorites}
                className="text-xs text-slate-500 hover:text-rose-600 font-medium transition-colors cursor-pointer"
              >
                Xóa tất cả
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
