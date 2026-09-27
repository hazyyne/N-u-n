import { Dish } from '../types/dish';

export const SAMPLE_DISH_IMAGES = {
  hero: '/src/assets/images/hero_food_suggestion_1790497335125.jpg',
  trung_ca_chua: '/src/assets/images/dish_trung_ca_chua_1790497353788.jpg',
  canh_ca_chua: '/src/assets/images/dish_canh_ca_chua_1790497368368.jpg',
  com_chien: '/src/assets/images/dish_com_chien_1790497383254.jpg',
  dau_sot_ca: '/src/assets/images/dish_dau_sot_ca_1790497400508.jpg',
};

export const COMMON_STUDENT_INGREDIENTS = [
  'Trứng gà/vịt',
  'Cà chua',
  'Đậu phụ',
  'Mì tôm',
  'Cơm nguội',
  'Thịt băm',
  'Xúc xích',
  'Bắp cải',
  'Khoai tây',
  'Hành lá',
  'Tỏi',
  'Rau muống',
];

export const PRESET_RECIPES: Dish[] = [
  {
    id: 'trung-chien-ca-chua',
    name: 'Trứng Chiên Xốt Cà Chua',
    description: 'Trứng chiên bông mềm quyện cùng sốt cà chua chua ngọt đậm đà, cực kỳ đưa cơm và dễ nấu.',
    timeMinutes: 12,
    timeText: '12 phút',
    difficulty: 'Rất dễ',
    budgetEstimate: '~15.000đ',
    utensils: 'Chỉ cần 1 chảo',
    imageUrl: SAMPLE_DISH_IMAGES.trung_ca_chua,
    matchedIngredients: ['trứng', 'cà chua', 'hành lá'],
    additionalIngredients: ['Dầu ăn', 'Nước mắm', 'Hạt nêm', 'Tiêu'],
    instructions: [
      'Đập 2-3 quả trứng vào bát, thêm 1 thìa cà phê nước mắm, tiêu xay và hành lá thái nhỏ rồi đánh tan.',
      'Cà chua rửa sạch, bổ múi cau hoặc thái hạt lựu nhỏ để nhanh mềm.',
      'Bắc chảo lên bếp, cho ít dầu ăn chiên trứng chín tới thì xắn miếng vừa ăn rồi trút ra đĩa riêng.',
      'Cho tiếp cà chua vào chảo dầm nhuyễn thành sốt sệt, nêm 1 thìa đường và nước mắm vừa miệng.',
      'Đổ trứng vào đảo nhẹ tay 1-2 phút cho ngấm đều sốt rồi rắc hành lá lên trên, tắt bếp.'
    ],
    studentTip: 'Thêm 1 thìa canh nước lọc vào trứng khi đánh sẽ giúp trứng nở xốp mềm mà không bị khô cứng khi chiên!',
    servings: '1-2 người',
    caloriesEstimate: '~320 kcal'
  },
  {
    id: 'canh-ca-chua-trung',
    name: 'Canh Cà Chua Trứng Thả (Canh Mây)',
    description: 'Bát canh nóng hổi, vị chua thanh dịu mát kết hợp vân trứng bồng bềnh như mây, giải nhiệt ngày thi cử.',
    timeMinutes: 10,
    timeText: '10 phút',
    difficulty: 'Rất dễ',
    budgetEstimate: '~12.000đ',
    utensils: '1 nồi nhỏ / nồi cơm điện',
    imageUrl: SAMPLE_DISH_IMAGES.canh_ca_chua,
    matchedIngredients: ['cà chua', 'trứng', 'hành lá'],
    additionalIngredients: ['Dầu ăn', 'Hạt nêm', 'Muối', 'Rau mùi/hành lá'],
    instructions: [
      'Cà chua thái múi cau. Đập 1-2 quả trứng ra bát đánh tan nhẹ.',
      'Phi thơm đầu hành với chút dầu, trút cà chua vào xào mềm tạo màu đỏ đẹp tự nhiên.',
      'Thêm 500ml nước đun sôi bùng, nêm nếm gia vị hạt nêm, chút muối vừa khẩu vị.',
      'Hạ lửa nhỏ, một tay đổ từ từ bát trứng vào, tay kia dùng đũa khuấy một chiều tạo vân mây mỏng đẹp.',
      'Tắt bếp ngay, múc ra bát và rắc nhiều hành lá, mùi tàu ăn kèm cơm nóng.'
    ],
    studentTip: 'Chờ nước thật sôi rồi mới đổ trứng và khuấy theo một chiều vòng tròn để trứng kết tủa thành từng mảng vân bồng bềnh đẹp mắt.',
    servings: '1-2 người',
    caloriesEstimate: '~180 kcal'
  },
  {
    id: 'com-chien-trung-xuc-xich',
    name: 'Cơm Chiên Trứng Xúc Xích Giòn Ngon',
    description: 'Bí quyết biến cơm nguội từ hôm qua thành đĩa cơm chiên vàng ươm, hạt tơi xốp thơm lừng mùi hành phi.',
    timeMinutes: 15,
    timeText: '15 phút',
    difficulty: 'Dễ',
    budgetEstimate: '~20.000đ',
    utensils: '1 chảo chống dính',
    imageUrl: SAMPLE_DISH_IMAGES.com_chien,
    matchedIngredients: ['cơm nguội', 'trứng', 'xúc xích', 'hành lá'],
    additionalIngredients: ['Tỏi băm', 'Dầu ăn', 'Nước tương', 'Hạt tiêu'],
    instructions: [
      'Trộn đều 1 lòng đỏ trứng gà trực tiếp vào bát cơm nguội, bóp nhẹ để từng hạt cơm bọc đều màu vàng óng.',
      'Xúc xích thái hạt lựu nhỏ, hành lá xắt nhuyễn.',
      'Phi tỏi thơm trên chảo dầu nóng, xào săn xúc xích rồi vớt tạm ra bát.',
      'Cho cơm vào chảo đảo đều lửa vừa đến khi hạt cơm săn lại và tơi xốp, nêm 1 thìa nước tương và chút hạt nêm.',
      'Đổ xúc xích cùng hành lá vào đảo chung 2 phút với lửa lớn, rắc hạt tiêu rồi tắt bếp.'
    ],
    studentTip: 'Nếu cơm nguội trong tủ lạnh bị vón cục, đeo găng tay nilon bóp tơi cơm với 1 quả trứng sống trước khi cho vào chảo chiên!',
    servings: '1 người',
    caloriesEstimate: '~480 kcal'
  },
  {
    id: 'dau-phu-sot-ca-chua',
    name: 'Đậu Phụ Sốt Cà Chua Đậm Đà',
    description: 'Món ăn quốc dân của sinh viên với đậu phụ vàng giòn rim trong xốt cà chua sánh mịn, ăn cực kỳ tốn cơm.',
    timeMinutes: 15,
    timeText: '15 phút',
    difficulty: 'Rất dễ',
    budgetEstimate: '~15.000đ',
    utensils: '1 chảo',
    imageUrl: SAMPLE_DISH_IMAGES.dau_sot_ca,
    matchedIngredients: ['đậu phụ', 'cà chua', 'hành lá'],
    additionalIngredients: ['Dầu ăn', 'Nước mắm', 'Đường', 'Hạt nêm'],
    instructions: [
      'Đậu phụ rửa nhẹ, thấm khô nước rồi cắt miếng vuông vừa ăn.',
      'Chiên đậu vàng đều các mặt trên chảo dầu nóng, gắp ra để ráo dầu.',
      'Dùng chảo đó gạn bớt dầu, cho cà chua xắt nhỏ vào xào cùng 2 thìa nước lọc, dầm cho cà nhuyễn mềm.',
      'Nêm 1 thìa nước mắm, 1 thìa cà phê đường, nửa thìa hạt nêm vào tạo vị chua mặn ngọt hài hòa.',
      'Trút đậu phụ đã rán vào đun liu riu 5 phút cho thấm đẫm sốt, rắc hành lá rồi tắt bếp.'
    ],
    studentTip: 'Thấm thật khô miếng đậu bằng khăn giấy trước khi rán sẽ giúp dầu không bị bắn và vỏ đậu giòn lâu hơn.',
    servings: '1-2 người',
    caloriesEstimate: '~280 kcal'
  },
  {
    id: 'mi-tom-tron-trung-long-dao',
    name: 'Mì Tôm Trộn Cay Ngọt Trứng Lòng Đào',
    description: 'Nâng cấp gói mì tôm quen thuộc thành món mì trộn hấp dẫn với trứng chần lòng đào béo ngậy.',
    timeMinutes: 8,
    timeText: '8 phút',
    difficulty: 'Rất dễ',
    budgetEstimate: '~12.000đ',
    utensils: '1 nồi nhỏ / ấm siêu tốc',
    imageUrl: SAMPLE_DISH_IMAGES.com_chien,
    matchedIngredients: ['mì tôm', 'trứng', 'hành lá', 'xúc xích'],
    additionalIngredients: ['Tương ớt', 'Dầu hào', 'Nước tương', 'Chút đường'],
    instructions: [
      'Pha xốt trộn: 1 thìa tương ớt, 1 thìa nước tương, nửa gói gia vị mì, 1 thìa cà phê đường và 1 thìa nước ấm.',
      'Luộc vắt mì trong 1.5 phút cho sợi mì vừa dai, vớt ra xả nhanh qua nước lạnh rồi để ráo.',
      'Chần 1 quả trứng trong nồi nước sôi lăn tăn khoảng 4 phút để được trứng lòng đào chuẩn vị.',
      'Trộn đều mì với phần nước xốt thơm lừng, cho xúc xích thái lát và trứng lòng đào lên trên.',
      'Cắt nhẹ trứng để lòng đào béo ngậy chảy ra phủ đều từng sợi mì.'
    ],
    studentTip: 'Xả mì qua nước lạnh ngay sau khi luộc sẽ ngăn sợi mì bị nhũn, giữ độ dai giòn chuẩn quán!',
    servings: '1 người',
    caloriesEstimate: '~420 kcal'
  },
  {
    id: 'thit-bam-rim-ca-chua',
    name: 'Thịt Băm Rim Cà Chua Chua Ngọt',
    description: 'Thịt heo băm ngọt thịt ngấm xốt cà chua sánh đỏ, rưới lên cơm nóng ăn sạch cả nồi.',
    timeMinutes: 15,
    timeText: '15 phút',
    difficulty: 'Dễ',
    budgetEstimate: '~25.000đ',
    utensils: '1 chảo hoặc nồi nhỏ',
    imageUrl: SAMPLE_DISH_IMAGES.dau_sot_ca,
    matchedIngredients: ['thịt băm', 'cà chua', 'hành lá', 'tỏi'],
    additionalIngredients: ['Hành khô', 'Nước mắm', 'Tiêu', 'Hạt nêm', 'Dầu ăn'],
    instructions: [
      'Ướp thịt băm với chút hạt nêm, tiêu và đầu hành lá băm trong 5 phút.',
      'Phi thơm hành tỏi băm trên chảo dầu, cho thịt vào xào săn tơi hạt rồi trút ra bát.',
      'Cho cà chua băm nhỏ vào chảo xào chín nhừ với 2 thìa nước và 1 thìa nước mắm.',
      'Đổ thịt băm trở lại chảo xốt cà chua, đảo đều với lửa nhỏ trong 5 phút đến khi nước xốt sánh lại.',
      'Rắc thêm chút tiêu đen xay và hành lá thái nhỏ rồi thưởng thức cùng cơm trắng.'
    ],
    studentTip: 'Mua thịt nạc vai xay có lẫn một chút mỡ (tỉ lệ 8 nạc : 2 mỡ) khi rim sẽ mềm béo, không bị khô khốc.',
    servings: '1-2 người',
    caloriesEstimate: '~360 kcal'
  },
  {
    id: 'canh-bap-cai-thit-bam',
    name: 'Canh Bắp Cải Nấu Thịt Băm Thanh Ngọt',
    description: 'Món canh thanh mát dễ làm, bắp cải giòn ngọt kết hợp vị ngọt tự nhiên của thịt băm.',
    timeMinutes: 15,
    timeText: '15 phút',
    difficulty: 'Rất dễ',
    budgetEstimate: '~20.000đ',
    utensils: '1 nồi canh',
    imageUrl: SAMPLE_DISH_IMAGES.canh_ca_chua,
    matchedIngredients: ['bắp cải', 'thịt băm', 'hành lá'],
    additionalIngredients: ['Gừng nhỏ', 'Muối', 'Hạt nêm', 'Nước mắm'],
    instructions: [
      'Bắp cải thái sợi vừa ăn, ngâm rửa sạch nước muối loãng rồi vớt ra ráo nước.',
      'Ướp thịt băm với nửa thìa hạt nêm và chút tiêu.',
      'Bắc nồi lên bếp, phi thơm hành khô rồi xào thịt băm chín tới.',
      'Chế 600ml nước vào nồi đun sôi, hớt bọt cho nước canh trong veo.',
      'Thả bắp cải vào nấu sôi thêm 2-3 phút cho vừa chín tới giữ độ giòn, nêm lại gia vị vừa ăn rồi thêm hành ngò.'
    ],
    studentTip: 'Đừng nấu bắp cải quá lâu sẽ bị nhũn và mất độ ngọt tự nhiên. Thêm 1 lát gừng mỏng sẽ giúp canh thơm ấm bụng.',
    servings: '2 người',
    caloriesEstimate: '~210 kcal'
  },
  {
    id: 'khoai-tay-xao-thit-bam',
    name: 'Khoai Tây Xào Thịt Băm Đậm Vị',
    description: 'Khoai tây bùi bùi dẻo ngon kết hợp thịt băm mằn mặn, cực hợp ăn cùng cơm vào những ngày mưa.',
    timeMinutes: 20,
    timeText: '20 phút',
    difficulty: 'Dễ',
    budgetEstimate: '~22.000đ',
    utensils: '1 chảo sâu lòng',
    imageUrl: SAMPLE_DISH_IMAGES.com_chien,
    matchedIngredients: ['khoai tây', 'thịt băm', 'tỏi', 'hành lá'],
    additionalIngredients: ['Dầu ăn', 'Nước tương', 'Hạt nêm', 'Hạt tiêu'],
    instructions: [
      'Khoai tây gọt vỏ, thái miếng con chì hoặc lát mỏng vừa, ngâm nước lạnh 5 phút rồi vớt ráo.',
      'Phi thơm tỏi băm, xào thịt băm chín tái với chút gia vị rồi để riêng.',
      'Dùng chảo đó cho khoai tây vào xào lửa vừa, thêm 3 thìa nước lọc đậy vung 3-4 phút cho khoai nhanh chín mềm.',
      'Khi khoai chín tới, trút thịt băm vào xào chung, nêm nước tương và dầu hào cho thơm.',
      'Đảo đều tay đến khi xốt bám quanh từng miếng khoai, rắc hành lá và tiêu lên mặt.'
    ],
    studentTip: 'Ngâm khoai tây thái vào nước lạnh trước khi xào giúp loại bỏ bớt tinh bột thừa, khoai xào không bị nát hay dính chảo.',
    servings: '1-2 người',
    caloriesEstimate: '~340 kcal'
  },
  {
    id: 'rau-muong-xao-toi',
    name: 'Rau Muống Xào Tỏi Xanh Mướt Giòn Rụm',
    description: 'Đĩa rau muống giòn sần sật thơm nức mùi tỏi phi, bí quyết giữ màu xanh mướt như nhà hàng.',
    timeMinutes: 8,
    timeText: '8 phút',
    difficulty: 'Rất dễ',
    budgetEstimate: '~10.000đ',
    utensils: '1 chảo lớn',
    imageUrl: SAMPLE_DISH_IMAGES.hero,
    matchedIngredients: ['rau muống', 'tỏi'],
    additionalIngredients: ['Dầu ăn', 'Nước mắm', 'Hạt nêm', 'Ớt tươi'],
    instructions: [
      'Rau muống nhặt khúc non, rửa sạch để thật ráo nước. Tỏi đập dập chia làm 2 phần.',
      'Đun nồi nước sôi với chút muối, chần nhanh rau muống trong 30 giây rồi vớt ra ngâm ngay vào âu nước mát.',
      'Phi 1/2 lượng tỏi với dầu ăn trên chảo nóng cho thật thơm vàng.',
      'Cho rau muống vào xào lửa to nhất, nêm hạt nêm và chút nước mắm đảo thật nhanh tay trong 1-2 phút.',
      'Thêm phần tỏi còn lại vào đảo đều 15 giây rồi trút ra đĩa thưởng thức ngay.'
    ],
    studentTip: 'Xào với lửa lớn và chần nhanh qua nước lạnh là 2 bí kíp vàng giúp rau muống giữ màu xanh nõn nà và cực kỳ giòn ngọt!',
    servings: '1-2 người',
    caloriesEstimate: '~110 kcal'
  },
  {
    id: 'trung-op-la-sot-tuong',
    name: 'Trứng Ốp La Xốt Tương Tỏi Ớt',
    description: 'Chỉ mất 5 phút là có ngay món ăn kèm cơm hoặc bánh mì siêu ngon, vị mặn ngọt cay cay bắt vị.',
    timeMinutes: 6,
    timeText: '6 phút',
    difficulty: 'Rất dễ',
    budgetEstimate: '~10.000đ',
    utensils: '1 chảo nhỏ',
    imageUrl: SAMPLE_DISH_IMAGES.trung_ca_chua,
    matchedIngredients: ['trứng', 'tỏi', 'hành lá'],
    additionalIngredients: ['Nước tương/xì dầu', 'Đường', 'Ớt băm', 'Dầu ăn'],
    instructions: [
      'Pha xốt: 2 thìa xì dầu, 1 thìa nước lọc, 1 thìa cà phê đường, chút tương ớt khuấy đều tan.',
      'Đun nóng chảo với ít dầu, đập 2 quả trứng ốp la lòng đào hoặc chín tùy sở thích.',
      'Khi rìa trứng xém giòn, đổ trực tiếp bát nước xốt và tỏi ớt băm vào quanh viền chảo.',
      'Đun sôi lăn tăn 1 phút cho xốt sánh lại và quyện vào đáy trứng.',
      'Rắc hành lá thái nhỏ lên trên rồi tắt bếp, chan nước xốt lên cơm nóng ăn liền.'
    ],
    studentTip: 'Món này kết hợp với bánh mì giòn hoặc cơm nguội hâm nóng là bữa sáng sinh viên siêu nhanh mà chất lượng.',
    servings: '1 người',
    caloriesEstimate: '~250 kcal'
  }
];

export function findMatchingDishes(userIngredients: string[]): Dish[] {
  if (!userIngredients || userIngredients.length === 0) {
    return PRESET_RECIPES.slice(0, 3);
  }

  const normalizedInput = userIngredients.map(i => i.trim().toLowerCase()).filter(Boolean);

  // Score each recipe based on matched ingredients
  const scored = PRESET_RECIPES.map(recipe => {
    let score = 0;
    const matchedList: string[] = [];

    const recipeKeywords = [
      ...recipe.matchedIngredients,
      ...recipe.name.toLowerCase().split(' '),
      recipe.id
    ].map(k => k.toLowerCase());

    for (const userInput of normalizedInput) {
      // Direct inclusion or substring match
      const isMatch = recipeKeywords.some(kw => kw.includes(userInput) || userInput.includes(kw));
      if (isMatch) {
        score += 10;
        if (!matchedList.includes(userInput)) {
          matchedList.push(userInput);
        }
      }
    }

    return {
      dish: {
        ...recipe,
        matchedIngredients: matchedList.length > 0 ? matchedList : recipe.matchedIngredients.slice(0, 2)
      },
      score
    };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Select top 3 distinct dishes
  return scored.slice(0, 3).map(s => s.dish);
}
