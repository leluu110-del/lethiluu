import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Play, Pause, RotateCcw, AlertTriangle, Pill, Syringe, BookmarkPlus, CheckCircle2 } from 'lucide-react';
import { LabObservationLog } from '../../types';

interface Props {
  onSaveLog: (log: Omit<LabObservationLog, 'id' | 'timestamp'>) => void;
}

export const VirusInfectionLab: React.FC<Props> = ({ onSaveLog }) => {
  const [virusType, setVirusType] = useState<'influenza' | 'phage'>('influenza');
  const [hasVaccine, setHasVaccine] = useState<boolean>(false);
  const [useAntibiotics, setUseAntibiotics] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<number>(37); // 37 vs 38.5
  const [currentStage, setCurrentStage] = useState<number>(0); // 0 to 4
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<string>('');
  const [virusCount, setVirusCount] = useState<number>(5);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const stages = [
    {
      name: '1. Hấp phụ (Bám dính)',
      desc: 'Gai glycoprotein của virus nhận diện và bám vào thụ thể màng tế bào chủ.',
      detail: 'Kháng thể từ vắc-xin có thể khóa chặt các gai này khiến virus không thể bám vào tế bào!'
    },
    {
      name: '2. Xâm nhập',
      desc: 'Virus bơm lõi acid nucleic (DNA hoặc RNA) vào bên trong chất tế bào chủ.',
      detail: 'Vỏ protein của virus thường bị để lại bên ngoài hoặc phân hủy trong tế bào chất.'
    },
    {
      name: '3. Sinh tổng hợp',
      desc: 'Lõi virus cướp quyền điều khiển, bắt tế bào chủ lấy nguyên liệu của nó để tổng hợp lõi và vỏ mới.',
      detail: 'Hàng trăm bản sao DNA/RNA và vỏ protein được tạo ra với tốc độ chóng mặt.'
    },
    {
      name: '4. Lắp ráp',
      desc: 'Lõi acid nucleic được đóng gói vào các vỏ protein mới tạo thành virus hoàn chỉnh.',
      detail: 'Các thành phần rời rạc khớp vào nhau như một dây chuyền lắp ráp tự động tinh xảo.'
    },
    {
      name: '5. Giải phóng',
      desc: 'Hàng trăm virus mới làm vỡ màng tế bào chủ chui ra ngoài, tế bào chủ bị tiêu diệt!',
      detail: 'Tế bào chủ vỡ tan. Các virus con lại tiếp tục tấn công các tế bào lân cận.'
    }
  ];

  // Auto progression if playing
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStage((prev) => {
          if (hasVaccine && prev >= 0) {
            // Blocked at stage 0!
            setIsPlaying(false);
            return 0;
          }
          if (prev < 4) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return 4;
          }
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, hasVaccine]);

  // Update virus count based on stage and vaccine
  useEffect(() => {
    if (hasVaccine) {
      setVirusCount(0);
    } else {
      if (currentStage === 0) setVirusCount(5);
      else if (currentStage === 1) setVirusCount(3);
      else if (currentStage === 2) setVirusCount(20);
      else if (currentStage === 3) setVirusCount(80);
      else if (currentStage === 4) setVirusCount(250);
    }
  }, [currentStage, hasVaccine]);

  const handleReset = () => {
    setCurrentStage(0);
    setIsPlaying(false);
  };

  const handleSave = () => {
    onSaveLog({
      labTitle: 'Mô phỏng: Chu trình nhân lên của Virus và Cơ chế phòng ngừa',
      studentPrediction: prediction || 'Chưa chọn dự đoán',
      conditionsApplied: {
        virus: virusType === 'influenza' ? 'Virus Cúm A' : 'Thực khuẩn thể Phage T4',
        vaccine: hasVaccine ? 'Đã tiêm Vaccine' : 'Chưa tiêm Vaccine',
        antibiotics: useAntibiotics ? 'Đã thử dùng kháng sinh' : 'Không dùng',
        temperature: `${temperature}°C`
      },
      conclusion: hasVaccine 
        ? 'Khi đã tiêm vắc-xin, cơ thể có sẵn kháng thể đặc hiệu bao vây gai virus ngay từ bước Hấp phụ, ngăn virus xâm nhập tế bào.'
        : useAntibiotics
        ? 'Dùng thuốc kháng sinh hoàn toàn không ngăn chặn được chu trình nhân lên của virus vì kháng sinh không tác động lên virus.'
        : 'Chu trình nhân lên gồm 5 giai đoạn: Hấp phụ → Xâm nhập → Sinh tổng hợp → Lắp ráp → Giải phóng làm phá vỡ tế bào chủ.'
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Box */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-sm">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-rose-900 text-lg">Mục tiêu: Mô phỏng Chu trình nhân lên của Virus</h3>
            <p className="text-sm text-rose-800 mt-1">
              Khám phá 5 giai đoạn virus ký sinh phá hủy tế bào chủ. Thử nghiệm sự khác nhau khi cơ thể <strong>Đã tiêm Vaccine</strong> và khi <strong>Uống thuốc kháng sinh</strong>.
            </p>

            <div className="mt-4 pt-3 border-t border-rose-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-900 mb-2">
                Dự đoán của em: Điều gì sẽ xảy ra khi ta uống thuốc kháng sinh để chống lại virus?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {[
                  'Thuốc kháng sinh sẽ tiêu diệt sạch virus trong 1 ngày',
                  'Thuốc kháng sinh KHÔNG tiêu diệt được virus vì virus chưa có cấu tạo tế bào',
                  'Thuốc kháng sinh biến virus thành vi khuẩn có lợi'
                ].map((text, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrediction(text)}
                    className={`text-left text-xs p-3 rounded-xl border transition-all ${
                      prediction === text
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm font-semibold'
                        : 'bg-white text-rose-950 border-rose-200 hover:bg-rose-100/60'
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
          <h4 className="font-bold text-slate-800 text-base">Cài đặt điều kiện thí nghiệm</h4>

          {/* Virus type */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-2">1. Chọn loài Virus:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setVirusType('influenza'); handleReset(); }}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  virusType === 'influenza'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🦠 Virus Cúm A (Hình khối có gai)
              </button>
              <button
                type="button"
                onClick={() => { setVirusType('phage'); handleReset(); }}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  virusType === 'phage'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🛸 Thực khuẩn thể (Phage T4)
              </button>
            </div>
          </div>

          {/* Vaccine Toggle */}
          <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Syringe className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs font-bold text-blue-900">Tiêm Vắc-xin phòng bệnh</p>
                <p className="text-[11px] text-blue-700">Tạo kháng thể bao vây gai virus</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setHasVaccine(!hasVaccine);
                handleReset();
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                hasVaccine
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-300'
              }`}
            >
              {hasVaccine ? '✓ Đã tiêm' : 'Chưa tiêm'}
            </button>
          </div>

          {/* Antibiotics Test Toggle */}
          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Pill className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-xs font-bold text-amber-900">Thử cho uống Kháng sinh</p>
                <p className="text-[11px] text-amber-700">Kiểm chứng kháng sinh có diệt được virus?</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setUseAntibiotics(!useAntibiotics)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                useAntibiotics
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-300'
              }`}
            >
              {useAntibiotics ? 'Đang thử thuốc' : 'Tắt'}
            </button>
          </div>

          {useAntibiotics && (
            <div className="p-3 bg-amber-100/70 border border-amber-300 text-amber-900 text-xs rounded-xl flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Kết quả thực tế:</strong> Kháng sinh chỉ diệt được vi khuẩn! Các hạt virus vẫn trơ trơ không hề hấn gì.
              </div>
            </div>
          )}

          {/* Temperature */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 uppercase mb-1">
              <span>Thân nhiệt cơ thể:</span>
              <span className={temperature > 37 ? 'text-rose-600 font-extrabold' : 'text-blue-600'}>
                {temperature}°C {temperature > 37 ? '(Phản ứng sốt đề kháng)' : '(Bình thường)'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTemperature(37)}
                className={`py-1.5 text-xs font-semibold rounded-lg border ${
                  temperature === 37 ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                37°C (Bình thường)
              </button>
              <button
                type="button"
                onClick={() => setTemperature(38.5)}
                className={`py-1.5 text-xs font-semibold rounded-lg border ${
                  temperature === 38.5 ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                38.5°C (Sốt nhẹ)
              </button>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="pt-3 border-t border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow-sm transition-all ${
                  isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isPlaying ? <><Pause className="w-4 h-4" /> Tạm dừng</> : <><Play className="w-4 h-4" /> Bắt đầu mô phỏng</>}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
                title="Khởi động lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Stage Selector Buttons */}
            <div className="grid grid-cols-5 gap-1">
              {stages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => { setCurrentStage(idx); setIsPlaying(false); }}
                  className={`py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                    currentStage === idx
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  B{idx + 1}
                </button>
              ))}
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

        {/* Animation Screen */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-inner text-white">
          {/* Top indicators */}
          <div className="flex flex-wrap items-center justify-between gap-2 z-10">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs font-semibold">
              Giai đoạn: {stages[currentStage].name}
            </span>
            <div className="flex items-center gap-2">
              {hasVaccine ? (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Có Kháng thể bảo vệ
                </span>
              ) : (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5" /> Chưa có đề kháng
                </span>
              )}
              <span className="px-2.5 py-1 bg-black/40 text-amber-300 rounded-lg text-xs font-mono">
                Số hạt virus: {virusCount}
              </span>
            </div>
          </div>

          {/* Interactive Visual Stage */}
          <div className="my-6 flex items-center justify-center min-h-[260px] relative">
            <svg viewBox="0 0 400 240" className="w-full max-w-md h-auto">
              {/* Host Cell */}
              <defs>
                <linearGradient id="cellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Cell Membrane */}
              <path
                d={
                  currentStage === 4 && !hasVaccine
                    ? "M 40,80 Q 90,40 180,60 Q 220,10 270,70 Q 320,130 260,180 Q 150,220 50,160 Z" // Cell bursting
                    : "M 40,60 Q 120,30 240,40 Q 340,50 360,130 Q 340,210 200,200 Q 70,210 40,140 Z"
                }
                fill="url(#cellGrad)"
                stroke={currentStage === 4 && !hasVaccine ? "#ef4444" : "#3b82f6"}
                strokeWidth={currentStage === 4 && !hasVaccine ? "3" : "2"}
                strokeDasharray={currentStage === 4 && !hasVaccine ? "6,4" : "none"}
              />

              {/* Host cell nucleus */}
              <circle
                cx="140"
                cy="120"
                r="35"
                fill="#1e293b"
                stroke="#64748b"
                strokeWidth="1.5"
                opacity={currentStage === 4 && !hasVaccine ? 0.3 : 0.8}
              />
              <text x="140" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                Nhân tế bào chủ
              </text>

              {/* VACCINE CASE: Antibodies neutralising virus outside */}
              {hasVaccine && (
                <g>
                  {/* Virus trapped */}
                  <circle cx="280" cy="50" r="16" fill="#f43f5e" stroke="#fff" strokeWidth="2" />
                  <text x="280" y="54" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">V</text>
                  {/* Antibodies Y-shapes */}
                  <g stroke="#10b981" strokeWidth="3" fill="none">
                    <path d="M 260,35 L 270,45 M 270,45 L 270,55 M 270,45 L 280,35" />
                    <path d="M 295,40 L 290,50 M 290,50 L 285,60" />
                    <path d="M 270,68 L 278,60 M 278,60 L 285,68" />
                  </g>
                  <rect x="230" y="75" width="130" height="26" rx="6" fill="#065f46" opacity="0.9" />
                  <text x="295" y="92" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">
                    Kháng thể khóa chặt gai!
                  </text>
                </g>
              )}

              {/* STAGE 0: Adsorption (Hấp phụ) */}
              {!hasVaccine && currentStage === 0 && (
                <g className="animate-bounce">
                  <circle cx="280" cy="65" r="14" fill="#f43f5e" stroke="#fb7185" strokeWidth="2" />
                  <line x1="280" y1="51" x2="280" y2="45" stroke="#fb7185" strokeWidth="2" />
                  <line x1="294" y1="65" x2="300" y2="65" stroke="#fb7185" strokeWidth="2" />
                  <line x1="280" y1="79" x2="280" y2="85" stroke="#fb7185" strokeWidth="2" />
                  <text x="280" y="69" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Hấp phụ</text>
                </g>
              )}

              {/* STAGE 1: Penetration (Xâm nhập) */}
              {!hasVaccine && currentStage === 1 && (
                <g>
                  <circle cx="260" cy="80" r="14" fill="none" stroke="#fb7185" strokeWidth="2" strokeDasharray="3,2" />
                  {/* Injected RNA/DNA strand */}
                  <path d="M 260,85 Q 240,110 210,115 T 180,120" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                  <text x="220" y="100" fill="#fecdd3" fontSize="9" fontWeight="bold">Bơm DNA/RNA</text>
                </g>
              )}

              {/* STAGE 2: Biosynthesis (Sinh tổng hợp) */}
              {!hasVaccine && currentStage === 2 && (
                <g>
                  {/* Multiplying viral components inside */}
                  <path d="M 170,95 Q 185,85 200,95" fill="none" stroke="#f43f5e" strokeWidth="2" />
                  <path d="M 210,130 Q 225,120 240,130" fill="none" stroke="#f43f5e" strokeWidth="2" />
                  <path d="M 160,150 Q 175,140 190,150" fill="none" stroke="#f43f5e" strokeWidth="2" />
                  <rect x="220" y="80" width="8" height="8" fill="#fda4af" />
                  <rect x="240" y="110" width="8" height="8" fill="#fda4af" />
                  <rect x="180" y="160" width="8" height="8" fill="#fda4af" />
                  <text x="220" y="160" fill="#fecdd3" fontSize="10" fontWeight="bold">Nhân bản linh kiện</text>
                </g>
              )}

              {/* STAGE 3: Assembly (Lắp ráp) */}
              {!hasVaccine && currentStage === 3 && (
                <g>
                  <circle cx="210" cy="90" r="10" fill="#f43f5e" />
                  <circle cx="240" cy="120" r="10" fill="#f43f5e" />
                  <circle cx="190" cy="150" r="10" fill="#f43f5e" />
                  <circle cx="260" cy="150" r="10" fill="#f43f5e" />
                  <text x="220" y="175" fill="#fecdd3" fontSize="10" fontWeight="bold">Lắp ráp virus mới</text>
                </g>
              )}

              {/* STAGE 4: Release (Giải phóng & phá vỡ) */}
              {!hasVaccine && currentStage === 4 && (
                <g>
                  <circle cx="340" cy="60" r="10" fill="#f43f5e" />
                  <circle cx="370" cy="100" r="10" fill="#f43f5e" />
                  <circle cx="350" cy="150" r="10" fill="#f43f5e" />
                  <circle cx="330" cy="190" r="10" fill="#f43f5e" />
                  <circle cx="280" cy="220" r="10" fill="#f43f5e" />
                  <text x="200" y="120" fill="#ef4444" fontSize="12" fontWeight="bold">
                    💥 TẾ BÀO CHỦ BỊ PHÁ HỦY!
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Bottom Stage Details Banner */}
          <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-xl">
            <h5 className="text-sm font-bold text-rose-300">{stages[currentStage].name}</h5>
            <p className="text-xs text-slate-300 mt-1">{stages[currentStage].desc}</p>
            <p className="text-[11px] text-amber-300 mt-1.5 font-medium">💡 {stages[currentStage].detail}</p>
          </div>
        </div>
      </div>

      {/* Inquiry Question */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <h4 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
          ❓ Câu hỏi củng cố kiến thức
        </h4>
        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
          <p className="text-sm font-semibold text-slate-800">
            Tại sao khi tiêm vắc-xin, cơ thể học sinh lại có thể chặn đứng virus ngay từ giai đoạn 1 (Hấp phụ)?
          </p>
          <p className="text-xs text-slate-600 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
            ✓ <strong>Lời giải thích:</strong> Vắc-xin huấn luyện hệ miễn dịch tạo ra sẵn các phân tử <em>kháng thể</em> có cấu trúc khớp hoàn hảo với các gai của virus. Khi virus xâm nhập, các kháng thể lập tức bám chặt bao vây các gai này, khiến virus không thể gắn vào thụ thể tế bào chủ được nữa!
          </p>
        </div>
      </div>
    </div>
  );
};
