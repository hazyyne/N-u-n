import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { IngredientInput } from './components/IngredientInput';
import { DishCard } from './components/DishCard';
import { RecipeModal } from './components/RecipeModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { StudentTipsSection } from './components/StudentTipsSection';
import { Dish, SuggestionResponse } from './types/dish';
import { findMatchingDishes, PRESET_RECIPES, SAMPLE_DISH_IMAGES } from './data/dishes';
import { Sparkles, Utensils, AlertCircle, ChefHat, RefreshCw } from 'lucide-react';

export default function App() {
  const [ingredients, setIngredients] = useState<string[]>(['trứng', 'cà chua']);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Dish[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [searchSource, setSearchSource] = useState<'gemini' | 'database'>('database');

  // Load saved favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('food_suggestion_favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading favorites from localStorage', e);
    }

    // Initial search on mount
    handleSuggest(['trứng', 'cà chua']);
  }, []);

  // Save favorites to localStorage
  const saveFavoritesToStorage = (updated: Dish[]) => {
    setFavorites(updated);
    try {
      localStorage.setItem('food_suggestion_favorites', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving favorites', e);
    }
  };

  const handleToggleFavorite = (dish: Dish) => {
    const exists = favorites.some((f) => f.id === dish.id);
    if (exists) {
      const updated = favorites.filter((f) => f.id !== dish.id);
      saveFavoritesToStorage(updated);
    } else {
      const updated = [dish, ...favorites];
      saveFavoritesToStorage(updated);
    }
  };

  const handleAddIngredient = (item: string) => {
    const trimmed = item.trim().toLowerCase();
    if (!trimmed) return;
    if (!ingredients.some((i) => i.toLowerCase() === trimmed)) {
      setIngredients((prev) => [...prev, item.trim()]);
    }
  };

  const handleRemoveIngredient = (item: string) => {
    setIngredients((prev) => prev.filter((i) => i.toLowerCase() !== item.toLowerCase()));
  };

  const handleClearAll = () => {
    setIngredients([]);
  };

  const handleSuggest = async (customIngredients?: string[]) => {
    const list = customIngredients || ingredients;
    if (list.length === 0) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      // Call server backend proxy
      const response = await fetch('/api/suggest-dishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: list }),
      });

      if (response.ok) {
        const data: SuggestionResponse = await response.json();
        if (data.dishes && data.dishes.length > 0) {
          setDishes(data.dishes.slice(0, 3));
          setSearchSource(data.source);
          setIsLoading(false);
          return;
        }
      }
    } catch (error) {
      console.warn('Backend fetch failed, utilizing smart client-side matcher:', error);
    }

    // Graceful client fallback
    const matched = findMatchingDishes(list);
    setDishes(matched.slice(0, 3));
    setSearchSource('database');
    setIsLoading(false);
  };

  const handleOpenDetails = (dish: Dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <Navbar
        favoriteCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onScrollToTips={() => {
          document.getElementById('tips')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onScrollToSearch={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Banner Header */}
        <section className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3 border border-emerald-200/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nấu ăn ngon chỉ từ 10 - 20 phút</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight">
            Gợi ý món ăn từ nguyên liệu sẵn có
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
            Bạn đang có gì trong tủ lạnh? Nhập nguyên liệu để nhận ngay 3 món ăn sinh viên siêu nhanh, tiết kiệm và chuẩn vị nhé!
          </p>
        </section>

        {/* Search & Input Component */}
        <div id="search-section" className="max-w-3xl mx-auto mb-12">
          <IngredientInput
            ingredients={ingredients}
            onAddIngredient={handleAddIngredient}
            onRemoveIngredient={handleRemoveIngredient}
            onClearAll={handleClearAll}
            onSubmit={() => handleSuggest()}
            isLoading={isLoading}
          />
        </div>

        {/* 3 Dishes Recommendation Grid */}
        <section className="scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  3 Món ăn phù hợp nhất
                </h2>
                {searchSource === 'gemini' && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    AI Gợi ý riêng
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Dựa trên: <span className="font-semibold text-slate-700">{ingredients.join(', ') || 'nguyên liệu bạn chọn'}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleSuggest()}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 p-1.5 self-start sm:self-auto cursor-pointer transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Đổi gợi ý khác</span>
            </button>
          </div>

          {/* Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 animate-pulse"
                >
                  <div className="aspect-[4/3] bg-slate-100 rounded-xl" />
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                  <div className="h-6 bg-slate-100 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-5/6" />
                  </div>
                  <div className="h-10 bg-slate-100 rounded-xl" />
                </div>
              ))}
            </div>
          ) : dishes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dishes.map((dish, index) => {
                const isFav = favorites.some((f) => f.id === dish.id);
                return (
                  <DishCard
                    key={dish.id || index}
                    dish={dish}
                    index={index}
                    isFavorite={isFav}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenDetails={handleOpenDetails}
                  />
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <ChefHat className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">
                Chưa tìm thấy món ăn phù hợp
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Hãy thử nhập thêm các nguyên liệu cơ bản như trứng, cà chua, thịt băm hoặc đậu phụ nhé!
              </p>
            </div>
          )}
        </section>

        {/* Student Kitchen Tips Section */}
        <StudentTipsSection />

        {/* FAQ & About Section */}
        <section id="faq" className="mt-16 pt-12 border-t border-slate-200">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Về ứng dụng Food Suggestion
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Food Suggestion được thiết kế tối giản, tươi sáng và thân thiện nhất với các bạn sinh viên, người đi làm bận rộn. Mục tiêu là giúp bạn giải quyết câu hỏi muôn thuở: <span className="font-semibold text-slate-800">"Hôm nay ăn gì?"</span> mà không cần mua sắm cầu kỳ, tận dụng tối đa những gì đang có sẵn trong tủ lạnh và phòng trọ.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div>
                <span className="font-bold text-slate-800 block mb-1">⏱️ Tiết kiệm thời gian</span>
                Các món gợi ý chỉ mất từ 8 - 20 phút thực hiện, có kèm đồng hồ bấm giờ trực tiếp khi nấu.
              </div>
              <div>
                <span className="font-bold text-slate-800 block mb-1">💰 Thân thiện túi tiền</span>
                Chi phí ước tính chỉ từ 10.000đ - 25.000đ mỗi bữa, tối ưu cho sinh viên.
              </div>
              <div>
                <span className="font-bold text-slate-800 block mb-1">🍳 Dụng cụ cơ bản</span>
                Chỉ cần 1 chảo chống dính hoặc nồi cơm điện nhỏ là có thể nấu ngon lành.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-800">Food Suggestion</span>
            <span>— Ứng dụng gợi ý món ăn cho sinh viên</span>
          </div>
          <div>
            <span>Phong cách tối giản · Tươi mát · Tiết kiệm</span>
          </div>
        </div>
      </footer>

      {/* Recipe Detail Modal */}
      <RecipeModal
        dish={selectedDish}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isFavorite={selectedDish ? favorites.some((f) => f.id === selectedDish.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={(id) => {
          const updated = favorites.filter((f) => f.id !== id);
          saveFavoritesToStorage(updated);
        }}
        onSelectDish={(dish) => {
          handleOpenDetails(dish);
        }}
        onClearFavorites={() => {
          saveFavoritesToStorage([]);
        }}
      />
    </div>
  );
}
