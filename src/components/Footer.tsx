import React from 'react';
import { Microscope, Heart, Shield, Globe, Award, Sparkles, MapPin } from 'lucide-react';
import { TabType } from '../types';

interface Props {
  onTabChange: (tab: TabType) => void;
  onOpenTeacherGuide: () => void;
  onOpenAI: () => void;
}

export const Footer: React.FC<Props> = ({ onTabChange, onOpenTeacherGuide, onOpenAI }) => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: School Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Microscope className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                AI Science Lab
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Phòng thí nghiệm Khoa học tự nhiên ảo dành riêng cho học sinh khối 6, Trường TH&THCS Hà Tiên, Tỉnh Kiên Giang.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>Phường Pháo Đài, TP. Hà Tiên, Kiên Giang</span>
            </div>
          </div>

          {/* Col 2: 4 KHTN 6 Topics */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
              4 Chủ đề KHTN 6
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('lessons')}
                  className="hover:text-white transition-colors"
                >
                  1. Cơ thể sinh vật &amp; Tế bào
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('lessons')}
                  className="hover:text-white transition-colors"
                >
                  2. Virus &amp; Phòng chống bệnh
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('lessons')}
                  className="hover:text-white transition-colors"
                >
                  3. Thế giới loài Nấm
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('lessons')}
                  className="hover:text-white transition-colors"
                >
                  4. Đa dạng sinh học &amp; Đầm Đông Hồ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Virtual Labs */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Phòng thí nghiệm ảo
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('lab')}
                  className="hover:text-white transition-colors"
                >
                  • Kính hiển vi quang học ảo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('lab')}
                  className="hover:text-white transition-colors"
                >
                  • Chu trình nhân lên của Virus
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('lab')}
                  className="hover:text-white transition-colors"
                >
                  • Nuôi cấy nấm mốc bánh mì 7 ngày
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('lab')}
                  className="hover:text-white transition-colors"
                >
                  • Lưới thức ăn rừng ngập mặn Hà Tiên
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Teacher & Safe usage */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Hỗ trợ Giáo viên &amp; Học sinh
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ứng dụng lưu trữ ngoại tuyến trên thiết bị, không thu thập thông tin cá nhân của học sinh.
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={onOpenTeacherGuide}
                className="text-left text-xs text-blue-400 hover:text-blue-300 font-semibold"
              >
                👉 Xem sổ tay hướng dẫn Thầy/Cô
              </button>
              <button
                type="button"
                onClick={onOpenAI}
                className="text-left text-xs text-sky-400 hover:text-sky-300 font-semibold"
              >
                💬 Trò chuyện với Trợ lý AI KHTN 6
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 AI Science Lab – Trường TH&amp;THCS Hà Tiên. Thiết kế thân thiện cho học sinh THCS.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Dạy và học tích cực cùng Khoa học Tự nhiên 6</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
