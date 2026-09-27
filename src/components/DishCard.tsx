import React, { useState } from 'react';
import { Clock, ChefHat, Bookmark, CheckCircle2, Flame, Utensils, Lightbulb } from 'lucide-react';
import { Dish } from '../types/dish';

interface DishCardProps {
  dish: Dish;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (dish: Dish) => void;
  onOpenDetails: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  index,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Visual Asset Container */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        {!imageError && dish.imageUrl ? (
          <img
            src={dish.imageUrl}
            alt={dish.name}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null}

        {/* Fallback container if image fails or loading */}
        {(!imageLoaded || imageError || !dish.imageUrl) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100 p-6 text-center">
            <ChefHat className="w-10 h-10 text-emerald-600/60 mb-2" />
            <span className="text-xs font-semibold text-slate-600 max-w-[80%] line-clamp-2">
              {dish.name}
            </span>
          </div>
        )}

        {/* Favorite button overlay */}
        <button
          type="button"
          onClick={() => onToggleFavorite(dish)}
          aria-label={isFavorite ? 'Bỏ lưu món' : 'Lưu món ăn'}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-sm'
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-500'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Index indicator */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide">
          Món #{index + 1}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata Row: Unboxed clean text with dot separator */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span className="tabular-nums">{dish.timeText}</span>
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{dish.difficulty}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="tabular-nums text-slate-700">{dish.budgetEstimate}</span>
          </div>

          {/* Dish Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {dish.name}
          </h3>

          {/* Short Description */}
          <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>

          {/* Matched & Needed Ingredients */}
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Nguyên liệu tận dụng:
              </span>
              <div className="flex flex-wrap gap-1 text-xs">
                {dish.matchedIngredients.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Basic recipe preview: 2 first steps */}
            <div className="pt-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Cách làm cơ bản:
              </span>
              <ul className="text-xs text-slate-600 space-y-1">
                {dish.instructions.slice(0, 2).map((step, sIdx) => (
                  <li key={sIdx} className="line-clamp-1 flex items-start gap-1.5">
                    <span className="font-semibold text-slate-400 shrink-0">{sIdx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
                {dish.instructions.length > 2 && (
                  <li className="text-[11px] text-emerald-600 font-medium">
                    +{dish.instructions.length - 2} bước tiếp theo...
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Student Tip Preview Banner */}
        <div className="p-2.5 bg-amber-50/70 border border-amber-200/50 rounded-xl flex items-start gap-2">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-900 leading-snug line-clamp-2">
            <span className="font-semibold">Mẹo sinh viên: </span>
            {dish.studentTip}
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => onOpenDetails(dish)}
          className="w-full py-2.5 px-4 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>Xem công thức & Nấu ngay</span>
        </button>
      </div>
    </article>
  );
};
