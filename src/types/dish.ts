export interface Dish {
  id: string;
  name: string;
  vietnameseName?: string;
  description: string;
  timeMinutes: number; // e.g., 15
  timeText: string;    // e.g., "15 phút"
  difficulty: 'Rất dễ' | 'Dễ' | 'Trung bình';
  budgetEstimate: string; // e.g., "~15.000đ"
  utensils: string;      // e.g., "1 chảo", "Nồi cơm điện", "1 nồi nhỏ"
  imageUrl?: string;
  matchedIngredients: string[];
  additionalIngredients: string[]; // Spices, pantry staples
  instructions: string[];
  studentTip: string;
  servings?: string; // e.g., "1-2 người"
  caloriesEstimate?: string; // e.g., "~350 kcal"
}

export interface SuggestionResponse {
  source: 'gemini' | 'database';
  dishes: Dish[];
  queryIngredients: string[];
  message?: string;
}
