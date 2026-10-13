import React from 'react';
import { Award, Trophy, BookmarkCheck, Calendar, Trash2, Printer, CheckCircle, ShieldAlert, Sparkles, Globe, Eye } from 'lucide-react';
import { QuizAttempt, LabObservationLog } from '../types';

interface Props {
  quizHistory: QuizAttempt[];
  labLogs: LabObservationLog[];
  onClearHistory: () => void;
  onClearLogs: () => void;
}

export const AchievementsSection: React.FC<Props> = ({
  quizHistory,
  labLogs,
  onClearHistory,
  onClearLogs
}) => {
  const totalQuizzes = quizHistory.length;
  const bestScore = quizHistory.length > 0 ? Math.max(...quizHistory.map((q) => q.percentage)) : 0;
  const totalLabs = labLogs.length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-xs rounded-full text-xs font-semibold text-blue-100 mb-2">
            <Trophy className="w-3.5 h-3.5 text-yellow-300" /> Hồ Sơ Học Tập Lưu Trên Thiết Bị
          </div>
          <h2 className="text-2xl font-black">Bảng Thành Tích & Nhật Ký KHTN 6</h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl">
            Tất cả điểm số trắc nghiệm và nhật ký quan sát thí nghiệm của em đều được lưu trữ an toàn ngay trên máy tính/điện thoại này. Em có thể khoe với Thầy/Cô và phụ huynh!
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="self-start md:self-center px-4 py-2.5 bg-white/15 hover:bg-white/25 border border-white/25 rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-all"
        >
          <Printer className="w-4 h-4" /> In / Lưu báo cáo kết quả
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <BookmarkCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Số lần làm trắc nghiệm</span>
            <span className="text-2xl font-black text-slate-800">{totalQuizzes} lượt</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Điểm cao nhất đạt được</span>
            <span className="text-2xl font-black text-emerald-600">
              {bestScore > 0 ? `${(bestScore / 10).toFixed(1)} / 10` : 'Chưa thi'}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Nhật ký thí nghiệm đã ghi</span>
            <span className="text-2xl font-black text-amber-600">{totalLabs} bài</span>
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" /> Huy hiệu Khoa học đã mở khóa
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className={`p-4 rounded-xl border text-center transition-all ${
            totalLabs >= 1 ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200 opacity-50'
          }`}>
            <span className="text-3xl block mb-1">🔬</span>
            <h4 className="text-xs font-bold text-slate-800">Thực Tập Sinh Kính Hiển Vi</h4>
            <p className="text-[10px] text-slate-500 mt-1">Đã soi mẫu tế bào vảy hành</p>
            {totalLabs >= 1 && <span className="text-[10px] text-emerald-700 font-bold mt-1 block">✓ Đã đạt</span>}
          </div>

          <div className={`p-4 rounded-xl border text-center transition-all ${
            quizHistory.some((q) => q.topicId === 'virus' && q.percentage >= 80)
              ? 'bg-rose-50 border-rose-300'
              : 'bg-slate-50 border-slate-200 opacity-50'
          }`}>
            <span className="text-3xl block mb-1">🛡️</span>
            <h4 className="text-xs font-bold text-slate-800">Dũng Sĩ Kháng Virus</h4>
            <p className="text-[10px] text-slate-500 mt-1">Đạt điểm &gt;= 8 chủ đề Virus</p>
            {quizHistory.some((q) => q.topicId === 'virus' && q.percentage >= 80) && (
              <span className="text-[10px] text-rose-700 font-bold mt-1 block">✓ Đã đạt</span>
            )}
          </div>

          <div className={`p-4 rounded-xl border text-center transition-all ${
            totalLabs >= 2 ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-slate-200 opacity-50'
          }`}>
            <span className="text-3xl block mb-1">🍄</span>
            <h4 className="text-xs font-bold text-slate-800">Chuyên Gia Vi Nấm</h4>
            <p className="text-[10px] text-slate-500 mt-1">Hoàn thành nuôi cấy mốc</p>
            {totalLabs >= 2 && <span className="text-[10px] text-amber-700 font-bold mt-1 block">✓ Đã đạt</span>}
          </div>

          <div className={`p-4 rounded-xl border text-center transition-all ${
            bestScore === 100 ? 'bg-yellow-50 border-yellow-300' : 'bg-slate-50 border-slate-200 opacity-50'
          }`}>
            <span className="text-3xl block mb-1">⭐</span>
            <h4 className="text-xs font-bold text-slate-800">Nhà Khoa Học Nhí Hà Tiên</h4>
            <p className="text-[10px] text-slate-500 mt-1">Đạt 10/10 điểm trắc nghiệm</p>
            {bestScore === 100 && <span className="text-[10px] text-yellow-700 font-bold mt-1 block">✓ Đã đạt</span>}
          </div>
        </div>
      </div>

      {/* Quiz History Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-blue-600" /> Lịch sử làm bài trắc nghiệm
          </h3>
          {quizHistory.length > 0 && (
            <button
              type="button"
              onClick={onClearHistory}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa lịch sử
            </button>
          )}
        </div>

        {quizHistory.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            Chưa có lượt làm bài nào. Hãy vào tab "Trắc nghiệm" để thử sức nhé!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Thời gian</th>
                  <th className="p-3">Tên / Biệt danh</th>
                  <th className="p-3">Chủ đề</th>
                  <th className="p-3 text-center">Số câu đúng</th>
                  <th className="p-3 text-center">Điểm số</th>
                  <th className="p-3">Huy hiệu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quizHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70">
                    <td className="p-3 font-mono text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {item.date}
                    </td>
                    <td className="p-3 font-bold text-slate-800">{item.studentName}</td>
                    <td className="p-3 text-slate-600">{item.topicName}</td>
                    <td className="p-3 text-center font-semibold text-slate-700">
                      {item.score}/{item.totalQuestions}
                    </td>
                    <td className="p-3 text-center font-bold">
                      <span className={`px-2 py-0.5 rounded ${
                        item.percentage >= 80 ? 'bg-emerald-100 text-emerald-800' : item.percentage >= 50 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {((item.score / item.totalQuestions) * 10).toFixed(1)} / 10
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-amber-700">{item.badgeAwarded || 'Đã hoàn thành'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lab Observation Logs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-600" /> Sổ tay Nhật ký Thí nghiệm đã lưu
          </h3>
          {labLogs.length > 0 && (
            <button
              type="button"
              onClick={onClearLogs}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa sổ tay
            </button>
          )}
        </div>

        {labLogs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            Chưa có ghi chép thí nghiệm nào. Em hãy vào tab "Phòng thí nghiệm" và bấm "Lưu nhật ký" sau khi thực hành nhé!
          </div>
        ) : (
          <div className="space-y-3">
            {labLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{log.labTitle}</h4>
                  <span className="text-[11px] font-mono text-slate-400">{log.timestamp}</span>
                </div>
                <div className="text-xs space-y-1">
                  <p className="text-slate-700">
                    <strong className="text-blue-700">Dự đoán ban đầu:</strong> {log.studentPrediction}
                  </p>
                  <p className="text-slate-700">
                    <strong className="text-emerald-700">Kết luận quan sát:</strong> {log.conclusion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
