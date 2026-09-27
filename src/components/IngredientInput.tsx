import React, { useState, KeyboardEvent } from 'react';
import { Search, Plus, X, Sparkles, RefreshCw } from 'lucide-react';
import { COMMON_STUDENT_INGREDIENTS } from '../data/dishes';

interface IngredientInputProps {
  ingredients: string[];
  onAddIngredient: (item: string) => void;
  onRemoveIngredient: (item: string) => void;
  onClearAll: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  onClearAll,
  onSubmit,
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    // Split by comma or semicolon if user pasted multiple
    const parts = inputValue.split(/[,;\n]/).map(p => p.trim()).filter(Boolean);
    parts.forEach(p => onAddIngredient(p));
    setInputValue('');
  };

  const handleQuickAdd = (item: string) => {
    onAddIngredient(item);
  };

  const handlePresetCombo = () => {
    // Pick 3 random student ingredients
    const shuffled = [...COMMON_STUDENT_INGREDIENTS].sort(() => 0.5 - Math.random());
    const sample = shuffled.slice(0, 3);
    onClearAll();
    sample.forEach(item => onAddIngredient(item));
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7">
      <div className="space-y-4">
        {/* Input box */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập nguyên liệu bạn đang có (ví dụ: trứng, cà chua, thịt băm)..."
              className="w-full pl-4 pr-11 py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 placeholder-slate-400 transition-all"
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleAdd}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                title="Thêm nguyên liệu"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isLoading || (ingredients.length === 0 && !inputValue.trim())}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-semibold text-sm sm:text-base rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed shrink-0"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Đang gợi ý...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Gợi ý món ăn</span>
              </>
            )}
          </button>
        </div>

        {/* Selected ingredients active list */}
        {ingredients.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Nguyên liệu trong tủ lạnh ({ingredients.length}):</span>
              <button
                type="button"
                onClick={onClearAll}
                className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
              >
                Xóa tất cả
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-lg border border-emerald-200/60"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => onRemoveIngredient(item)}
                    className="p-0.5 hover:bg-emerald-200/80 rounded transition-colors text-emerald-700 cursor-pointer"
                    aria-label={`Xóa ${item}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quick select ingredients */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-slate-500">
              Chọn nhanh nguyên liệu quen thuộc của sinh viên:
            </p>
            <button
              type="button"
              onClick={handlePresetCombo}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Gợi ý ngẫu nhiên</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {COMMON_STUDENT_INGREDIENTS.map((item) => {
              const isSelected = ingredients.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleQuickAdd(item)}
                  disabled={isSelected}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                      : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200/80 hover:border-emerald-300'
                  }`}
                >
                  + {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
