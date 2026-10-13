import React from 'react';
import { GraduationCap, X, CheckCircle, Share2, ShieldCheck, Laptop, WifiOff, Globe, BookOpen } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/15 rounded-xl border border-white/20">
              <GraduationCap className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Sổ Tay Hướng Dẫn Dành Cho Thầy/Cô</h3>
              <p className="text-xs text-blue-100">Trường TH&THCS Hà Tiên – Môn Khoa Học Tự Nhiên 6</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg text-white/90 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800 text-xs sm:text-sm">
          {/* Welcome note */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 leading-relaxed">
            Kính chào Thầy/Cô bộ môn KHTN! Ứng dụng <strong>AI Science Lab</strong> này đã được xây dựng hoàn thiện 100%, sẵn sàng phục vụ các tiết dạy học tương tác trên lớp cũng như cho học sinh tự học tại nhà. Thầy/Cô <strong>hoàn toàn không cần biết lập trình</strong> hay tự sửa mã nguồn.
          </div>

          {/* Section 1: How to test */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Laptop className="w-4 h-4 text-blue-600" /> 1. Cách Thầy/Cô kiểm tra trước khi lên lớp
            </h4>
            <div className="space-y-2 text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Kiểm tra Bài học KHTN 6:</strong> Bấm vào tab <em>"Bài học KHTN 6"</em> để duyệt qua 4 chủ đề (Cơ thể sinh vật, Virus, Nấm, Đa dạng sinh học đầm Đông Hồ). Mỗi bài đều có sơ đồ trực quan và câu hỏi nhỏ củng cố.
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Kiểm tra Phòng thí nghiệm ảo:</strong> Mở tab <em>"Phòng thí nghiệm"</em> và thử điều chỉnh kính hiển vi, tiêm vắc-xin ngăn chặn virus, hay nuôi cấy nấm mốc 7 ngày.
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Kiểm tra Chấm điểm tự động:</strong> Làm thử 1 bài trắc nghiệm, bấm nộp bài để xem hệ thống tự chấm và lưu bảng điểm tại tab <em>"Bảng thành tích"</em>.
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: How to publish & share */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-600" /> 2. Cách chia sẻ website cho học sinh sử dụng
            </h4>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-slate-700">
              <p>
                <strong>Bước 1:</strong> Thầy/Cô chỉ cần sao chép đường link ứng dụng (Development URL hoặc Shared App URL trên trình duyệt) gửi vào nhóm Zalo lớp/nhóm học tập KHTN 6.
              </p>
              <p>
                <strong>Bước 2:</strong> Học sinh mở link trên bất kỳ thiết bị nào (máy tính phòng tin học, máy tính bảng, hoặc điện thoại di động) mà không cần cài đặt phần mềm phức tạp.
              </p>
              <p>
                <strong>Bước 3:</strong> Trên lớp, Thầy/Cô có thể chiếu màn hình lên máy chiếu/TV tương tác và gọi học sinh lên bảng điều khiển kính hiển vi ảo hoặc bấm chạy mô phỏng.
              </p>
            </div>
          </div>

          {/* Section 3: Privacy & Security */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 3. Cam kết an toàn & Bảo vệ quyền riêng tư học sinh
            </h4>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5 text-emerald-900">
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <strong>Không thu thập dữ liệu cá nhân:</strong> Ứng dụng không yêu cầu số điện thoại, email hay mật khẩu.
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <strong>Lưu trữ tại máy học sinh:</strong> Toàn bộ điểm số, nhật ký thí nghiệm chỉ được lưu trong bộ nhớ máy (Local Storage) của thiết bị đang dùng.
              </p>
            </div>
          </div>

          {/* Section 4: Offline mode */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-amber-600" /> 4. Chế độ Ngoại tuyến khi mạng trường học chập chờn
            </h4>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 leading-relaxed">
              Nếu phòng tin học hoặc lớp học mất Internet, học sinh vẫn đọc bài học, xem mô phỏng kính hiển vi, nuôi cấy nấm và làm bài trắc nghiệm <strong>bình thường 100%</strong>. Riêng trợ lý AI trực tuyến sẽ chuyển sang thông báo thân thiện và sử dụng kho kiến thức KHTN 6 tích hợp sẵn.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs"
          >
            Đã hiểu & Bắt đầu sử dụng
          </button>
        </div>
      </div>
    </div>
  );
};
