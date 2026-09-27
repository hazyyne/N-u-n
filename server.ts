import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { findMatchingDishes, SAMPLE_DISH_IMAGES } from './src/data/dishes.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

// Initialize GoogleGenAI SDK server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Map dish titles/keywords to relevant image paths
function pickMatchingImage(dishName: string, description: string): string {
  const combined = (dishName + ' ' + description).toLowerCase();
  if (combined.includes('cơm chiên') || combined.includes('cơm rang') || combined.includes('cơm')) {
    return SAMPLE_DISH_IMAGES.com_chien;
  }
  if (combined.includes('canh')) {
    return SAMPLE_DISH_IMAGES.canh_ca_chua;
  }
  if (combined.includes('đậu') || combined.includes('đậu hũ') || combined.includes('sốt cà') || combined.includes('rim')) {
    return SAMPLE_DISH_IMAGES.dau_sot_ca;
  }
  if (combined.includes('trứng') || combined.includes('ốp la') || combined.includes('cuộn')) {
    return SAMPLE_DISH_IMAGES.trung_ca_chua;
  }
  return SAMPLE_DISH_IMAGES.hero;
}

// API endpoint to suggest 3 student dishes based on ingredients
app.post('/api/suggest-dishes', async (req, res) => {
  try {
    const rawIngredients = req.body.ingredients;
    let ingredientList: string[] = [];

    if (Array.isArray(rawIngredients)) {
      ingredientList = rawIngredients.map(i => String(i).trim()).filter(Boolean);
    } else if (typeof rawIngredients === 'string') {
      ingredientList = rawIngredients
        .split(/[,;\n+]/)
        .map(i => i.trim())
        .filter(Boolean);
    }

    if (ingredientList.length === 0) {
      ingredientList = ['trứng', 'cà chua'];
    }

    // Try AI generation with Gemini if available
    if (ai) {
      try {
        const prompt = `Bạn là một đầu bếp sinh viên Việt Nam thân thiện và thông minh.
Người dùng có các nguyên liệu sau: ${ingredientList.join(', ')}.
Hãy gợi ý ĐÚNG 3 MÓN ĂN Việt Nam phù hợp nhất cho sinh viên (tiết kiệm, ngon miệng, chỉ dùng dụng cụ nấu ăn cơ bản như chảo, nồi cơm điện hoặc nồi nhỏ, thời gian nấu nhanh dưới 25 phút).

Với mỗi món, cung cấp:
- name: Tên món ăn bằng tiếng Việt rõ ràng, hấp dẫn (ví dụ: "Trứng Chiên Xốt Cà Chua")
- description: Giới thiệu ngắn gọn 1 câu khơi dậy vị giác
- timeMinutes: Số phút nấu ước tính (số nguyên, ví dụ: 15)
- timeText: Chuỗi thời gian (ví dụ: "15 phút")
- difficulty: Mức độ ("Rất dễ" hoặc "Dễ" hoặc "Trung bình")
- budgetEstimate: Ước tính chi phí sinh viên (ví dụ: "~15.000đ")
- utensils: Dụng cụ nấu chính (ví dụ: "Chỉ cần 1 chảo", "Nồi cơm điện", "1 nồi nhỏ")
- matchedIngredients: Danh sách các nguyên liệu người dùng đã có được sử dụng trong món
- additionalIngredients: Các gia vị và nguyên liệu phụ thông dụng sinh viên thường có (nước mắm, dầu ăn, đường, tiêu, tỏi...)
- instructions: Mảng gồm 4-5 bước nấu cơ bản, súc tích, dễ làm
- studentTip: Mẹo nhỏ cực hữu ích cho sinh viên (cách làm phồng trứng, mẹo tận dụng đồ thừa, tiết kiệm gas/điện, hoặc làm xốt ngon)`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                dishes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      timeMinutes: { type: Type.INTEGER },
                      timeText: { type: Type.STRING },
                      difficulty: { type: Type.STRING },
                      budgetEstimate: { type: Type.STRING },
                      utensils: { type: Type.STRING },
                      matchedIngredients: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      additionalIngredients: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      instructions: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      studentTip: { type: Type.STRING },
                    },
                    required: [
                      'name',
                      'description',
                      'timeMinutes',
                      'timeText',
                      'difficulty',
                      'budgetEstimate',
                      'utensils',
                      'matchedIngredients',
                      'additionalIngredients',
                      'instructions',
                      'studentTip',
                    ],
                  },
                },
              },
              required: ['dishes'],
            },
          },
        });

        const textOutput = response.text?.trim() || '';
        const parsed = JSON.parse(textOutput);

        if (parsed.dishes && Array.isArray(parsed.dishes) && parsed.dishes.length > 0) {
          const formattedDishes = parsed.dishes.slice(0, 3).map((d: any, index: number) => ({
            id: `gemini-${Date.now()}-${index}`,
            name: d.name,
            description: d.description,
            timeMinutes: Number(d.timeMinutes) || 15,
            timeText: d.timeText || `${d.timeMinutes || 15} phút`,
            difficulty: d.difficulty || 'Dễ',
            budgetEstimate: d.budgetEstimate || '~20.000đ',
            utensils: d.utensils || '1 chảo chống dính',
            imageUrl: pickMatchingImage(d.name, d.description),
            matchedIngredients: d.matchedIngredients || ingredientList,
            additionalIngredients: d.additionalIngredients || ['Dầu ăn', 'Nước mắm', 'Hạt nêm', 'Tiêu'],
            instructions: d.instructions || [],
            studentTip: d.studentTip || 'Nấu với lửa vừa để thức ăn chín đều mà không bị cháy!',
            servings: '1-2 người',
            caloriesEstimate: '~320 kcal',
          }));

          return res.json({
            source: 'gemini',
            dishes: formattedDishes,
            queryIngredients: ingredientList,
          });
        }
      } catch (geminiError) {
        console.warn('Gemini generateContent error or fallback triggered:', geminiError);
        // Fallback to local recipe matching database below
      }
    }

    // High quality fallback using our rich curated student recipe database
    const localDishes = findMatchingDishes(ingredientList);
    return res.json({
      source: 'database',
      dishes: localDishes,
      queryIngredients: ingredientList,
    });
  } catch (error) {
    console.error('API Error in /api/suggest-dishes:', error);
    const fallbackDishes = findMatchingDishes([]);
    return res.json({
      source: 'database',
      dishes: fallbackDishes,
      queryIngredients: [],
      message: 'Đã hiển thị các món ăn sinh viên phổ biến nhất.',
    });
  }
});

// Configure Vite middleware in development or static serve in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Food Suggestion App is running on http://localhost:${PORT}`);
  });
}

startServer();
