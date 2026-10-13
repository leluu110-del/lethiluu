import React from 'react';
import { Microscope, FlaskConical, Award, Bot, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, MapPin, Lightbulb, Heart, BookOpen } from 'lucide-react';
import { TabType, TopicId } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';

interface Props {
  onTabChange: (tab: TabType) => void;
  onSelectLesson: (topicId: TopicId) => void;
  onSelectLabTopic: (topicId: TopicId) => void;
  onOpenAI: () => void;
  onOpenTeacherGuide: () => void;
}

export const HomeSection: React.FC<Props> = ({
  onTabChange,
  onSelectLesson,
  onSelectLabTopic,
  onOpenAI,
  onOpenTeacherGuide
}) => {
  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-6 sm:p-10 lg:p-12 shadow-xl shadow-blue-900/10 border border-blue-600/30">
        {/* Abstract science particles background */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-60 h-60 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-blue-100 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dành cho học sinh Lớp 6 – Trường TH&amp;THCS Hà Tiên</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            AI Science Lab <br />
            <span className="bg-gradient-to-r from-yellow-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent">
              Phòng Thí Nghiệm KHTN Ảo
            </span>
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-2xl">
            Tự do soi kính hiển vi tế bào vảy hành, quan sát virus nhân lên, nuôi cấy nấm mốc và bảo vệ rừng ngập mặn đầm Đông Hồ. Học Khoa học tự nhiên 6 thật dễ hiểu cùng Trợ lý AI thông minh!
          </p>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onTabChange('lab')}
              className="py-3 px-6 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-black rounded-xl text-xs sm:text-sm shadow-lg shadow-yellow-400/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <FlaskConical className="w-4 h-4 text-blue-950" /> Vào Phòng Thí Nghiệm Ngay
            </button>
            <button
              type="button"
              onClick={() => onTabChange('lessons')}
              className="py-3 px-5 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold rounded-xl text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Xem 4 Bài Học KHTN
            </button>
            <button
              type="button"
              onClick={onOpenAI}
              className="py-3 px-5 bg-indigo-600/80 hover:bg-indigo-600 border border-indigo-400/30 text-white font-bold rounded-xl text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-yellow-300" /> Hỏi Trợ Lý AI
            </button>
          </div>

          {/* Quick local badge */}
          <div className="pt-2 flex items-center gap-2 text-xs text-blue-200">
            <MapPin className="w-4 h-4 text-amber-300 flex-shrink-0" />
            <span>Nội dung bám sát SGK KHTN 6 và thiên nhiên đặc thù vùng đất Hà Tiên - Kiên Giang</span>
          </div>
        </div>
      </section>

      {/* 4 Lessons Section */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
              Chương trình học tập
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              4 Bài Học KHTN 6 Trọng Tâm
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onTabChange('lessons')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Xem tất cả bài học <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LESSONS_DATA.map((lesson) => {
            const colorClass =
              lesson.id === 'cell_organism'
                ? 'border-emerald-200 hover:border-emerald-400'
                : lesson.id === 'virus'
                ? 'border-rose-200 hover:border-rose-400'
                : lesson.id === 'fungi'
                ? 'border-amber-200 hover:border-amber-400'
                : 'border-cyan-200 hover:border-cyan-400';

            const badgeBg =
              lesson.id === 'cell_organism'
                ? 'bg-emerald-50 text-emerald-800'
                : lesson.id === 'virus'
                ? 'bg-rose-50 text-rose-800'
                : lesson.id === 'fungi'
                ? 'bg-amber-50 text-amber-800'
                : 'bg-cyan-50 text-cyan-800';

            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`bg-white rounded-2xl p-5 border-2 ${colorClass} shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeBg}`}>
                      {lesson.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{lesson.duration}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {lesson.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-600 group-hover:underline">
                    Bắt đầu học ngay
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Virtual Lab Experiments Highlight */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
            Thực hành trải nghiệm
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            4 Mô Phỏng Thí Nghiệm KHTN Ảo
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Cho phép học sinh tự chỉnh biến số, đưa ra dự đoán, quan sát chuyển động và ghi nhận nhật ký khoa học.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onSelectLabTopic('cell_organism')}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
              🔬
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Kính hiển vi quang học ảo</h3>
              <p className="text-xs text-slate-500 mt-1">
                Lấy nét vảy hành, tế bào niêm mạc miệng, nhuộm Lugol và phóng đại 40x - 400x.
              </p>
            </div>
            <span className="inline-block text-xs font-bold text-blue-600">Thực hành ngay →</span>
          </div>

          <div
            onClick={() => onSelectLabTopic('virus')}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-rose-400 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
              🦠
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Chu trình nhân lên của Virus</h3>
              <p className="text-xs text-slate-500 mt-1">
                Xem 5 giai đoạn xâm nhập, thử nghiệm tiêm Vaccine và kiểm chứng thuốc kháng sinh.
              </p>
            </div>
            <span className="inline-block text-xs font-bold text-rose-600">Thực hành ngay →</span>
          </div>

          <div
            onClick={() => onSelectLabTopic('fungi')}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
              🍞
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Nuôi cấy Nấm mốc 7 ngày</h3>
              <p className="text-xs text-slate-500 mt-1">
                Điều chỉnh nhiệt độ, độ ẩm trên bánh mì, cơm nguội; rút ra mẹo bảo quản thực phẩm.
              </p>
            </div>
            <span className="inline-block text-xs font-bold text-amber-600">Thực hành ngay →</span>
          </div>

          <div
            onClick={() => onSelectLabTopic('biodiversity')}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-cyan-400 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-lg">
              🌊
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Sinh thái Rừng ngập mặn Hà Tiên</h3>
              <p className="text-xs text-slate-500 mt-1">
                Mô phỏng cân bằng sinh thái đầm Đông Hồ, bảo vệ cây đước và làm sạch rác biển.
              </p>
            </div>
            <span className="inline-block text-xs font-bold text-cyan-600">Thực hành ngay →</span>
          </div>
        </div>
      </section>

      {/* Why AI Science Lab Box */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
          <h3 className="font-bold text-base text-blue-950">Mô phỏng Khoa học Trực quan</h3>
          <p className="text-xs text-blue-800 leading-relaxed">
            Học sinh THCS lớp 6 dễ dàng quan sát các đối tượng siêu hiển vi như tế bào và virus chuyển động chân thực, thay vì chỉ tưởng tượng qua hình chụp sách giáo khoa.
          </p>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-base text-emerald-950">Trợ Lý AI Dẫn Dắt Tư Duy</h3>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Trợ lý AI giải thích bằng ngôn ngữ gần gũi, khích lệ và đặt câu hỏi gợi ý để học sinh tự suy luận, hình thành năng lực tự học và tư duy nghiên cứu khoa học.
          </p>
        </div>

        <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-6 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-base text-indigo-950">Chế Độ Ngoại Tuyến &amp; An Toàn</h3>
          <p className="text-xs text-indigo-800 leading-relaxed">
            Hoạt động trơn tru ngay cả khi mạng Internet tại trường học bị gián đoạn. Không thu thập bất kỳ dữ liệu cá nhân nào của học sinh.
          </p>
        </div>
      </section>

      {/* Quick Teacher Banner */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Thầy/Cô muốn trình chiếu trong tiết dạy?</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Xem ngay hướng dẫn sử dụng từng tính năng trên máy chiếu, tivi thông minh và chia sẻ bài tập cho học sinh.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenTeacherGuide}
          className="self-start sm:self-center py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
        >
          📖 Xem Sổ Tay Giáo Viên
        </button>
      </section>
    </div>
  );
};
