import React from 'react';
import { WifiOff, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  isOnline: boolean;
}

export const OfflineNotice: React.FC<Props> = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2.5 text-xs font-medium shadow-sm transition-all animate-in slide-in-from-top-2">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1 bg-white/20 rounded-lg">
            <WifiOff className="w-4 h-4" />
          </span>
          <span>
            <strong>Đang ở Chế độ Ngoại tuyến:</strong> Thiết bị mất kết nối Internet. Trợ lý AI trực tuyến tạm thời không hoạt động.
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-100 text-[11px] bg-black/20 px-2.5 py-0.5 rounded-full font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
          <span>Bài học, Thí nghiệm ảo &amp; Trắc nghiệm vẫn chạy bình thường!</span>
        </div>
      </div>
    </div>
  );
};
