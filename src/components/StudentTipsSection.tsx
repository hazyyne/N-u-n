import React from 'react';
import { Sparkles, Snowflake, Flame, Egg, UtensilsCrossed } from 'lucide-react';

export const StudentTipsSection: React.FC = () => {
  const tips = [
    {
      icon: Egg,
      title: 'Bí kíp trứng chiên phồng xốp',
      description:
        'Khi đánh trứng, hãy cho thêm 1 thìa canh nước lọc hoặc 2 giọt nước cốt chanh. Trứng chiên sẽ mềm xốp, thơm vàng mà không bao giờ bị khô cứng.',
      badge: 'Trứng & Đậu phụ',
    },
    {
      icon: Snowflake,
      title: 'Bảo quản hành lá 1 tháng',
      description:
        'Hành lá mua về rửa sạch, để thật ráo nước rồi xắt nhỏ, cho vào chai nhựa hoặc hộp sạch cất ngăn đá. Khi nấu canh hoặc xào chỉ cần rắc thẳng vào chảo.',
      badge: 'Tiết kiệm thời gian',
    },
    {
      icon: UtensilsCrossed,
      title: 'Xử lý cơm nguội thành cơm chiên vàng óng',
      description:
        'Đeo găng tay nilon bóp đều cơm nguội với 1 lòng đỏ trứng gà trước khi chiên. Từng hạt cơm sẽ được bọc lớp vàng óng ả và tơi xốp đều vị.',
      badge: 'Cơm nguội',
    },
    {
      icon: Flame,
      title: 'Mẹo luộc mì gói dai giòn',
      description:
        'Chỉ luộc mì khoảng 1.5 - 2 phút trong nước sôi, sau đó vớt ngay ra xả qua nước mát để hãm nhiệt. Sợi mì sẽ dai giòn sần sật như ở tiệm.',
      badge: 'Mì tôm sinh viên',
    },
  ];

  return (
    <section id="tips" className="mt-16 pt-12 border-t border-slate-200">
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kinh nghiệm góc bếp phòng trọ</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Mẹo nấu ăn nhanh, ngon & tiết kiệm cho sinh viên
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
          Những mẹo nhỏ giúp bạn tiết kiệm tiền chợ, nấu ăn nhanh gọn sau giờ học căng thẳng mà vẫn đủ chất dinh dưỡng.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tips.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-emerald-300 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-400">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
