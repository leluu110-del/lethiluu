import React, { useState } from 'react';
import { Globe, Trees, Fish, Bird, Waves, AlertTriangle, ShieldCheck, BookmarkPlus, CheckCircle2 } from 'lucide-react';
import { LabObservationLog } from '../../types';

interface Props {
  onSaveLog: (log: Omit<LabObservationLog, 'id' | 'timestamp'>) => void;
}

export const BiodiversityLab: React.FC<Props> = ({ onSaveLog }) => {
  const [mangroveCover, setMangroveCover] = useState<number>(75); // 20 - 100%
  const [fishingLevel, setFishingLevel] = useState<'destructive' | 'sustainable' | 'reserve'>('sustainable');
  const [plasticPollution, setPlasticPollution] = useState<'low' | 'medium' | 'high'>('low');
  const [prediction, setPrediction] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Calculate biodiversity index (0 - 100)
  const calculateMetrics = () => {
    let score = mangroveCover * 0.5; // up to 50 pts

    if (fishingLevel === 'reserve') score += 30;
    else if (fishingLevel === 'sustainable') score += 20;
    else score += 0; // destructive

    if (plasticPollution === 'low') score += 20;
    else if (plasticPollution === 'medium') score += 10;
    else score += 0;

    const finalIndex = Math.min(100, Math.max(10, Math.round(score)));

    // Populations
    const shrimpCount = Math.round(finalIndex * 15 * (mangroveCover / 100));
    const fishCount = Math.round(finalIndex * 8);
    const birdCount = Math.round(finalIndex * 1.5 * (fishingLevel === 'destructive' ? 0.4 : 1));
    const waterClarity = Math.round((mangroveCover * 0.6) + (plasticPollution === 'low' ? 40 : plasticPollution === 'medium' ? 20 : 5));

    return {
      finalIndex,
      shrimpCount,
      fishCount,
      birdCount,
      waterClarity: Math.min(100, waterClarity),
      status: finalIndex > 75 ? 'Hệ sinh thái trù phú & Cân bằng' : finalIndex > 45 ? 'Suy thoái nhẹ - Cần bảo vệ' : 'Báo động: Mất cân bằng sinh thái nghiêm trọng'
    };
  };

  const metrics = calculateMetrics();

  const handlePlantMangrove = () => {
    setMangroveCover((prev) => Math.min(100, prev + 15));
  };

  const handleCleanBeach = () => {
    setPlasticPollution('low');
  };

  const handleSave = () => {
    onSaveLog({
      labTitle: 'Mô phỏng: Cân bằng Đa dạng sinh học Rừng ngập mặn Đầm Đông Hồ - Hà Tiên',
      studentPrediction: prediction || 'Chưa chọn dự đoán',
      conditionsApplied: {
        mangroveCover: `${mangroveCover}%`,
        fishingLevel: fishingLevel === 'reserve' ? 'Khu bảo tồn' : fishingLevel === 'sustainable' ? 'Bền vững' : 'Đánh bắt tận diệt',
        plasticPollution: plasticPollution === 'low' ? 'Ít rác nhựa' : plasticPollution === 'medium' ? 'Trung bình' : 'Nhiều rác nhựa',
        biodiversityIndex: `${metrics.finalIndex}/100`
      },
      conclusion: `Khi diện tích rừng ngập mặn đạt ${mangroveCover}% và đánh bắt có kiểm soát, chỉ số đa dạng sinh học đạt ${metrics.finalIndex}/100. Rừng đước đóng vai trò là cái nôi che chở và lọc nước cho toàn bộ hệ sinh thái Hà Tiên.`
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Box */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-cyan-600 text-white rounded-xl shadow-sm">
            <Globe className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-cyan-900 text-lg">Mục tiêu: Mô phỏng Cân bằng Đa dạng Sinh học Đầm Đông Hồ</h3>
            <p className="text-sm text-cyan-800 mt-1">
              Khám phá mối quan hệ tương tác giữa các loài trong hệ sinh thái đất ngập nước ven biển Hà Tiên (Cây đước, tôm cá, chim nước và con người).
            </p>

            <div className="mt-4 pt-3 border-t border-cyan-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-cyan-900 mb-2">
                Dự đoán của em: Nếu chặt phá hết rừng đước ngập mặn ở đầm Đông Hồ thì điều gì sẽ xảy ra?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {[
                  'Tôm, cua, cá con mất nơi trú ẩn sinh sản, nguồn lợi thủy sản suy giảm mạnh',
                  'Số lượng cá và chim biển sẽ tăng gấp đôi',
                  'Nước biển sẽ trong xanh và đẹp hơn'
                ].map((text, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrediction(text)}
                    className={`text-left text-xs p-3 rounded-xl border transition-all ${
                      prediction === text
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm font-semibold'
                        : 'bg-white text-cyan-950 border-cyan-200 hover:bg-cyan-100/60'
                    }`}
                  >
                    {idx + 1}. {text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
          <h4 className="font-bold text-slate-800 text-base">Tác động của con người & Môi trường</h4>

          {/* Mangrove slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1">
                <Trees className="w-3.5 h-3.5 text-emerald-600" /> 1. Độ che phủ rừng đước:
              </label>
              <span className="text-xs font-bold text-emerald-700">{mangroveCover}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={mangroveCover}
              onChange={(e) => setMangroveCover(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>20% (Bị chặt phá nhiều)</span>
              <span>100% (Bảo tồn rừng nguyên sinh)</span>
            </div>
          </div>

          {/* Fishing methods */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-2 flex items-center gap-1">
              <Fish className="w-3.5 h-3.5 text-blue-600" /> 2. Hoạt động khai thác thủy sản:
            </label>
            <div className="space-y-2">
              {[
                { id: 'destructive', title: 'Đánh bắt tận diệt (Xiếc điện, cào đáy)', color: 'rose' },
                { id: 'sustainable', title: 'Đánh bắt bền vững (Thả lưới mắt to, giữ cá con)', color: 'blue' },
                { id: 'reserve', title: 'Thiết lập Khu bảo tồn nghiêm ngặt', color: 'emerald' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFishingLevel(item.id as any)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    fishingLevel === item.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* Plastic pollution */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-2 flex items-center gap-1">
              <Waves className="w-3.5 h-3.5 text-cyan-600" /> 3. Mức độ rác thải nhựa:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'low', label: 'Rất sạch (Ít rác)' },
                { id: 'medium', label: 'Vừa phải' },
                { id: 'high', label: 'Ô nhiễm nặng' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPlasticPollution(item.id as any)}
                  className={`py-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                    plasticPollution === item.id
                      ? 'bg-cyan-600 text-white border-cyan-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Positive Actions */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block">Hành động bảo vệ thiên nhiên:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handlePlantMangrove}
                className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Trees className="w-4 h-4 text-emerald-600" /> Trồng thêm cây đước
              </button>
              <button
                type="button"
                onClick={handleCleanBeach}
                className="py-2 px-3 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Waves className="w-4 h-4 text-cyan-600" /> Thu gom rác biển
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all"
          >
            <BookmarkPlus className="w-4 h-4" /> Lưu nhật ký mô phỏng này
          </button>

          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              Đã ghi vào sổ tay học tập!
            </div>
          )}
        </div>

        {/* Visual Ecosystem Canvas */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 flex flex-col justify-between relative shadow-inner text-white">
          {/* Top Score */}
          <div className="flex flex-wrap items-center justify-between gap-2 z-10">
            <div>
              <span className="text-xs text-slate-400">Chỉ số Đa dạng sinh học:</span>
              <div className="text-2xl font-black flex items-center gap-2">
                <span className={metrics.finalIndex > 70 ? 'text-emerald-400' : metrics.finalIndex > 40 ? 'text-amber-400' : 'text-rose-400'}>
                  {metrics.finalIndex} / 100
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200">
                  {metrics.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30">
                Độ trong nước: {metrics.waterClarity}%
              </span>
            </div>
          </div>

          {/* Interactive Ecosystem Panorama */}
          <div className="my-6 relative min-h-[260px] flex items-center justify-center">
            <svg viewBox="0 0 450 250" className="w-full max-w-lg h-auto">
              <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={plasticPollution === 'high' ? '#334155' : '#0284c7'} />
                  <stop offset="100%" stopColor={plasticPollution === 'high' ? '#1e293b' : '#0369a1'} />
                </linearGradient>
              </defs>

              {/* Sky */}
              <rect x="0" y="0" width="450" height="130" fill="url(#skyGrad)" />
              {/* Sun */}
              <circle cx="60" cy="40" r="22" fill="#fef08a" opacity="0.9" />

              {/* Mountain Thạch Động in background */}
              <polygon points="120,130 180,45 240,130" fill="#0f766e" opacity="0.4" />
              <polygon points="190,130 260,35 320,130" fill="#115e59" opacity="0.6" />

              {/* Water surface */}
              <rect x="0" y="130" width="450" height="120" fill="url(#waterGrad)" />

              {/* Mangrove Root & Trees along coast */}
              {Array.from({ length: Math.round(mangroveCover / 10) }).map((_, i) => (
                <g key={i} transform={`translate(${i * 42 + 10}, 85)`}>
                  {/* Mangrove stilt roots */}
                  <path d="M 15,45 Q 8,55 0,70 M 15,45 Q 22,55 30,70 M 15,45 L 15,70" stroke="#78350f" strokeWidth="2.5" fill="none" />
                  {/* Trunk */}
                  <rect x="12" y="20" width="6" height="25" fill="#78350f" />
                  {/* Canopy */}
                  <circle cx="15" cy="15" r="16" fill="#15803d" />
                  <circle cx="8" cy="12" r="12" fill="#16a34a" />
                  <circle cx="22" cy="12" r="12" fill="#16a34a" />
                </g>
              ))}

              {/* Floating Birds */}
              {Array.from({ length: Math.min(8, Math.max(1, Math.round(metrics.birdCount / 15))) }).map((_, i) => (
                <g key={i} transform={`translate(${i * 45 + 50}, ${30 + (i % 3) * 15})`}>
                  <path d="M 0,0 Q 8,-8 16,0 Q 24,-8 32,0" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                </g>
              ))}

              {/* Underwater Marine Life */}
              {Array.from({ length: Math.min(10, Math.max(2, Math.round(metrics.fishCount / 80))) }).map((_, i) => (
                <g key={i} transform={`translate(${60 + (i * 35) % 360}, ${155 + (i * 18) % 70})`}>
                  {/* Fish icon */}
                  <path d="M 0,0 Q 10,-6 20,0 L 26,-4 L 26,4 L 20,0 Q 10,6 0,0 Z" fill="#fde047" />
                  <circle cx="4" cy="-1" r="1" fill="#000" />
                </g>
              ))}

              {/* Plastic Waste if high */}
              {plasticPollution === 'high' && (
                <g>
                  <rect x="100" y="145" width="16" height="8" rx="2" fill="#ef4444" opacity="0.8" />
                  <rect x="220" y="160" width="14" height="12" rx="3" fill="#cbd5e1" opacity="0.8" />
                  <rect x="340" y="150" width="18" height="6" rx="2" fill="#f59e0b" opacity="0.8" />
                  <text x="225" y="190" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">
                    ⚠️ Rác thải nhựa trôi nổi đầu độc tôm cá!
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Species Count Cards */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
              <div className="flex items-center justify-center gap-1 text-slate-300 text-xs">
                <Fish className="w-3.5 h-3.5 text-blue-400" /> Cá & Tôm sú
              </div>
              <div className="text-base font-bold text-blue-300 mt-1">{metrics.fishCount} cá thể</div>
            </div>
            <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
              <div className="flex items-center justify-center gap-1 text-slate-300 text-xs">
                <Bird className="w-3.5 h-3.5 text-amber-400" /> Cò trắng & Chim biển
              </div>
              <div className="text-base font-bold text-amber-300 mt-1">{metrics.birdCount} cá thể</div>
            </div>
            <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
              <div className="flex items-center justify-center gap-1 text-slate-300 text-xs">
                <Trees className="w-3.5 h-3.5 text-emerald-400" /> Rừng đước
              </div>
              <div className="text-base font-bold text-emerald-300 mt-1">{mangroveCover}% che phủ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Real world connection */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <h4 className="font-bold text-slate-800 text-base mb-2">
          🇻🇳 Kết nối tình yêu quê hương Hà Tiên
        </h4>
        <p className="text-xs text-slate-700 leading-relaxed">
          Đầm Đông Hồ rộng hơn 1.300 ha ở Hà Tiên là một trong những vùng đất ngập nước quý báu nhất đồng bằng sông Cửu Long. Nhờ có các rễ đước, vẹt cắm sâu vào bùn lầy, các hạt phù sa được giữ lại, tạo ra môi trường giàu dinh dưỡng để ấu trùng tôm cua lớn lên an toàn. Giữ gìn rừng ngập mặn chính là bảo vệ nguồn mưu sinh lâu dài cho ngư dân quê mình!
        </p>
      </div>
    </div>
  );
};
