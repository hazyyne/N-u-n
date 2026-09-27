import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Flame,
  CheckCircle,
  Lightbulb,
  Play,
  Pause,
  RotateCcw,
  Utensils,
  Share2,
  Bookmark,
  BellRing
} from 'lucide-react';
import { Dish } from '../types/dish';

interface RecipeModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (dish: Dish) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  dish,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!isOpen || !dish) return null;

  // Cooking Timer State
  const initialSeconds = (dish.timeMinutes || 15) * 60;
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [timerRunning, setTimerRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [timerFinished, setTimerFinished] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Reset timer if dish changes
  useEffect(() => {
    setTimeLeft((dish.timeMinutes || 15) * 60);
    setTimerRunning(false);
    setCompletedSteps([]);
    setTimerFinished(false);
  }, [dish.id]);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      setTimerFinished(true);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  // Format time MM:SS
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: dish.name,
        text: `Nấu món "${dish.name}" trong ${dish.timeText} với ứng dụng Food Suggestion!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `Món ngon: ${dish.name} (${dish.timeText}) - Công thức: ${dish.instructions.join(' -> ')}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="text-emerald-700 font-semibold">{dish.timeText}</span>
              <span aria-hidden="true">·</span>
              <span>{dish.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-medium text-slate-700">{dish.budgetEstimate}</span>
              <span aria-hidden="true">·</span>
              <span>{dish.utensils}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {dish.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(dish)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              title={isFavorite ? 'Bỏ lưu' : 'Lưu món ăn'}
            >
              <Bookmark className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Sao chép công thức"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {copiedLink && (
          <div className="bg-emerald-600 text-white text-xs py-1.5 px-4 text-center font-medium animate-in fade-in">
            Đã sao chép công thức vào bộ nhớ tạm!
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Top Banner: Student Cooking Timer */}
          <div className={`p-4 rounded-2xl border transition-all ${
            timerFinished
              ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/20'
              : 'bg-slate-900 text-white border-slate-800'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${
                  timerFinished ? 'bg-emerald-500 text-white' : 'bg-white/10 text-emerald-400'
                }`}>
                  {timerFinished ? <BellRing className="w-6 h-6 animate-bounce" /> : <Clock className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className={`text-xs font-semibold uppercase tracking-wider ${
                    timerFinished ? 'text-emerald-800' : 'text-slate-400'
                  }`}>
                    Đồng hồ nấu ăn sinh viên
                  </h4>
                  <p className={`text-2xl sm:text-3xl font-extrabold tabular-nums tracking-tight ${
                    timerFinished ? 'text-emerald-700' : 'text-white'
                  }`}>
                    {formatTimer(timeLeft)}
                  </p>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    timerRunning
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm'
                  }`}
                >
                  {timerRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Tạm dừng</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>{timeLeft === 0 ? 'Nấu lại' : 'Bắt đầu bấm giờ'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTimeLeft(initialSeconds);
                    setTimerRunning(false);
                    setTimerFinished(false);
                  }}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                  title="Đặt lại thời gian"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
            {timerFinished && (
              <p className="mt-2 text-xs text-emerald-800 font-semibold text-center sm:text-left">
                🎉 Đã hết thời gian dự kiến! Hãy kiểm tra món ăn và thưởng thức nhé!
              </p>
            )}
          </div>

          {/* Ingredients Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Utensils className="w-4 h-4 text-emerald-600" />
              <span>Nguyên liệu chuẩn bị ({dish.servings || '1-2 người'})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="font-semibold text-emerald-900 block mb-1.5">
                  Nguyên liệu bạn đang có:
                </span>
                <ul className="space-y-1">
                  {dish.matchedIngredients.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="font-semibold text-slate-700 block mb-1.5">
                  Gia vị cơ bản cần có:
                </span>
                <ul className="space-y-1">
                  {dish.additionalIngredients.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Các bước thực hiện ({dish.instructions.length} bước)</span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                Đã xong: {completedSteps.length}/{dish.instructions.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {dish.instructions.map((step, idx) => {
                const isDone = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isDone
                        ? 'bg-emerald-50/50 border-emerald-200 text-slate-500'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <button
                      type="button"
                      className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'border border-slate-300 hover:border-emerald-500 text-transparent'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                      <span className={`font-bold mr-2 ${isDone ? 'text-emerald-700' : 'text-slate-900'}`}>
                        Bước {idx + 1}:
                      </span>
                      <span className={isDone ? 'line-through text-slate-400' : ''}>
                        {step}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Student Tip Highlight */}
          <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-start gap-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                Mẹo sinh viên hữu ích
              </h4>
              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                {dish.studentTip}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Dụng cụ: <span className="font-semibold text-slate-700">{dish.utensils}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Đóng công thức
          </button>
        </div>
      </div>
    </div>
  );
};
