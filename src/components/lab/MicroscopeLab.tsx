import React, { useState } from 'react';
import { Eye, Focus, ZoomIn, Sparkles, CheckCircle2, AlertCircle, RefreshCw, BookmarkPlus } from 'lucide-react';
import { LabObservationLog } from '../../types';

interface Props {
  onSaveLog: (log: Omit<LabObservationLog, 'id' | 'timestamp'>) => void;
}

export const MicroscopeLab: React.FC<Props> = ({ onSaveLog }) => {
  const [sample, setSample] = useState<'onion' | 'cheek' | 'euglena'>('onion');
  const [stain, setStain] = useState<'none' | 'lugol' | 'methylene'>('lugol');
  const [zoom, setZoom] = useState<number>(100); // 40, 100, 400
  const [focus, setFocus] = useState<number>(50); // 0 - 100, optimal is 50
  const [brightness, setBrightness] = useState<number>(65); // 20 - 100
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [prediction, setPrediction] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>(null);

  // Focus clarity: the closer to 50, the clearer (blur 0)
  const blurAmount = Math.abs(focus - 50) * 0.15;
  const isSharp = Math.abs(focus - 50) < 10;

  const handleSave = () => {
    onSaveLog({
      labTitle: 'Kính hiển vi ảo: Quan sát tế bào vảy hành & tế bào động vật',
      studentPrediction: prediction || 'Chưa chọn dự đoán',
      conditionsApplied: {
        sample: sample === 'onion' ? 'Vảy hành' : sample === 'cheek' ? 'Niêm mạc miệng' : 'Trùng roi',
        stain: stain === 'lugol' ? 'Nhuộm Lugol' : stain === 'methylene' ? 'Xanh Metylen' : 'Không nhuộm',
        zoom: `${zoom}x`,
        focus: `${focus}%`,
        brightness: `${brightness}%`
      },
      conclusion: sample === 'onion' 
        ? 'Tế bào biểu bì vảy hành xếp sát nhau hình tổ ong, có thành cellulose cứng cáp, nhân bắt màu sẫm khi nhuộm Lugol.'
        : sample === 'cheek'
        ? 'Tế bào niêm mạc miệng không có thành tế bào nên hình dạng mềm mại, nhân tròn ở giữa.'
        : 'Trùng roi xanh có roi bơi và lục lạp màu xanh, là sinh vật đơn bào.'
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Intro & Prediction */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-sm">
            <Eye className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 text-lg">Mục tiêu thí nghiệm: Kính hiển vi quang học ảo</h3>
            <p className="text-sm text-blue-800 mt-1">
              Em hãy thực hành điều chỉnh vật kính, ốc vi cấp lấy nét và quan sát sự khác nhau giữa tế bào thực vật (vảy hành) và tế bào người (niêm mạc miệng).
            </p>

            <div className="mt-4 pt-3 border-t border-blue-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-blue-900 mb-2">
                Bước 1: Đưa ra dự đoán của em trước khi soi kính hiển vi:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {[
                  'Tế bào vảy hành có thành cứng cáp xếp như bức tường gạch',
                  'Tế bào vảy hành không có nhân tế bào',
                  'Tế bào vảy hành tròn xoe giống tế bào máu'
                ].map((text, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrediction(text)}
                    className={`text-left text-xs p-3 rounded-xl border transition-all ${
                      prediction === text
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-semibold'
                        : 'bg-white text-blue-950 border-blue-200 hover:bg-blue-100/60'
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

      {/* Main Lab Bench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls sidebar */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
          <h4 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <ZoomIn className="w-5 h-5 text-blue-600" /> Bảng điều khiển kính hiển vi
          </h4>

          {/* Sample Select */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-2">1. Chọn mẫu tiêu bản:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSample('onion')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  sample === 'onion'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🧅 Biểu bì vảy hành
              </button>
              <button
                type="button"
                onClick={() => setSample('cheek')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  sample === 'cheek'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                👄 Niêm mạc miệng
              </button>
              <button
                type="button"
                onClick={() => setSample('euglena')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  sample === 'euglena'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🦠 Trùng roi xanh
              </button>
            </div>
          </div>

          {/* Stain Select */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-2">2. Dung dịch nhuộm màu:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStain('none')}
                className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all ${
                  stain === 'none'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Không nhuộm (Mờ)
              </button>
              <button
                type="button"
                onClick={() => setStain('lugol')}
                className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all ${
                  stain === 'lugol'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                🧪 Nhuộm Lugol (Nâu)
              </button>
              <button
                type="button"
                onClick={() => setStain('methylene')}
                className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all ${
                  stain === 'methylene'
                    ? 'bg-cyan-600 text-white border-cyan-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                💧 Xanh Metylen
              </button>
            </div>
          </div>

          {/* Magnification */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">3. Độ phóng đại vật kính:</label>
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                Tổng: {zoom * 10}x (Thị kính 10x × Vật kính {zoom}x)
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[40, 100, 400].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setZoom(val)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    zoom === val
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {val}x {val === 40 ? '(Bao quát)' : val === 100 ? '(Vừa)' : '(Chi tiết)'}
                </button>
              ))}
            </div>
          </div>

          {/* Focus Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1">
                <Focus className="w-3.5 h-3.5 text-blue-600" /> 4. Ốc vi cấp (Lấy nét hình ảnh):
              </label>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${isSharp ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {isSharp ? '✓ Rất nét (50%)' : 'Đang mờ'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={focus}
              onChange={(e) => setFocus(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>0 (Mờ trước)</span>
              <span className="font-bold text-blue-600">50 (Chuẩn nét)</span>
              <span>100 (Mờ sau)</span>
            </div>
          </div>

          {/* Brightness Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">5. Độ sáng đèn LED kính:</label>
              <span className="text-xs font-semibold text-slate-700">{brightness}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Toggles */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <span className="text-xs font-medium text-slate-700">Hiển thị chú thích bộ phận</span>
            <button
              type="button"
              onClick={() => setShowLabels(!showLabels)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                showLabels ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md" />
            </button>
          </div>

          {/* Save observation */}
          <button
            type="button"
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all"
          >
            <BookmarkPlus className="w-4 h-4" /> Lưu nhật ký thí nghiệm này
          </button>

          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              Đã ghi nhận vào Nhật ký học tập của em!
            </div>
          )}
        </div>

        {/* Viewport / Circular Eyepiece */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-mono rounded-lg border border-white/10">
              Mẫu: {sample === 'onion' ? 'Biểu bì vảy hành' : sample === 'cheek' ? 'Niêm mạc miệng' : 'Trùng roi xanh'}
            </span>
            <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-amber-400 text-xs font-mono rounded-lg border border-white/10">
              Độ nét: {isSharp ? 'Sắc nét 100%' : `${Math.max(10, 100 - Math.round(blurAmount * 20))}%`}
            </span>
          </div>

          {/* Eyepiece Circle */}
          <div className="w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border-8 border-slate-800 shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex items-center justify-center bg-black">
            {/* Light background reflecting lamp */}
            <div
              className="absolute inset-0 rounded-full transition-opacity duration-300"
              style={{
                backgroundColor:
                  stain === 'lugol'
                    ? '#fef3c7'
                    : stain === 'methylene'
                    ? '#e0f2fe'
                    : '#f8fafc',
                opacity: brightness / 100,
              }}
            />

            {/* Microscopic Specimen Canvas */}
            <div
              className="w-full h-full relative transition-all duration-300 flex items-center justify-center"
              style={{
                filter: `blur(${blurAmount}px)`,
                transform: `scale(${zoom === 40 ? 0.8 : zoom === 100 ? 1.1 : 1.6})`,
              }}
            >
              {sample === 'onion' && (
                <svg viewBox="0 0 300 300" className="w-[320px] h-[320px]">
                  {/* Onion Plant Cells - Honeycomb / Brick wall structure */}
                  <defs>
                    <pattern id="onionGrid" width="60" height="40" patternUnits="userSpaceOnUse">
                      <rect width="60" height="40" fill="none" stroke={stain === 'lugol' ? '#b45309' : '#94a3b8'} strokeWidth="3" />
                      <circle cx="30" cy="20" r="4.5" fill={stain === 'lugol' ? '#78350f' : stain === 'methylene' ? '#1d4ed8' : '#cbd5e1'} />
                      <ellipse cx="30" cy="20" rx="14" ry="10" fill={stain === 'lugol' ? 'rgba(217, 119, 6, 0.12)' : 'rgba(203, 213, 225, 0.1)'} />
                    </pattern>
                  </defs>
                  <rect width="300" height="300" fill="url(#onionGrid)" />

                  {/* Highlighting central representative cell */}
                  <g
                    onClick={() => setSelectedOrganelle('Thành tế bào & Nhân')}
                    className="cursor-pointer"
                  >
                    <rect x="90" y="80" width="120" height="60" rx="4" fill={stain === 'lugol' ? '#fde68a' : '#f1f5f9'} stroke={stain === 'lugol' ? '#92400e' : '#64748b'} strokeWidth="4" />
                    {/* Vacuole */}
                    <rect x="105" y="90" width="90" height="40" rx="8" fill="rgba(255,255,255,0.6)" stroke="#cbd5e1" strokeDasharray="3,3" />
                    {/* Nucleus */}
                    <circle cx="150" cy="110" r="7" fill={stain === 'lugol' ? '#78350f' : stain === 'methylene' ? '#1e3a8a' : '#94a3b8'} />
                    <circle cx="151" cy="109" r="2.5" fill="#fef08a" />
                  </g>
                </svg>
              )}

              {sample === 'cheek' && (
                <svg viewBox="0 0 300 300" className="w-[320px] h-[320px]">
                  {/* Animal Cheek Epithelial Cells - Irregular soft round shapes */}
                  <g>
                    {/* Cell 1 */}
                    <path
                      d="M60,90 Q90,50 140,70 Q190,90 170,140 Q150,190 90,170 Q40,150 60,90 Z"
                      fill={stain === 'methylene' ? '#bae6fd' : '#f8fafc'}
                      stroke={stain === 'methylene' ? '#0284c7' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <circle cx="115" cy="120" r="6" fill={stain === 'methylene' ? '#1e3a8a' : '#64748b'} />

                    {/* Cell 2 - Main center */}
                    <path
                      d="M130,130 Q180,100 230,130 Q280,170 240,220 Q190,260 140,220 Q100,180 130,130 Z"
                      fill={stain === 'methylene' ? '#7dd3fc' : '#e2e8f0'}
                      stroke={stain === 'methylene' ? '#0369a1' : '#64748b'}
                      strokeWidth="3"
                    />
                    <circle cx="185" cy="175" r="8" fill={stain === 'methylene' ? '#0f172a' : '#475569'} />
                    <circle cx="187" cy="173" r="2" fill="#38bdf8" />
                  </g>
                </svg>
              )}

              {sample === 'euglena' && (
                <svg viewBox="0 0 300 300" className="w-[320px] h-[320px]">
                  {/* Euglena with flagellum and chloroplasts */}
                  <g className="animate-pulse">
                    <path
                      d="M110,60 C150,50 200,90 190,160 C180,220 130,250 110,210 C90,160 80,90 110,60 Z"
                      fill="#86efac"
                      stroke="#16a34a"
                      strokeWidth="3"
                    />
                    {/* Flagellum (roi bơi) */}
                    <path d="M125,55 Q130,20 150,10 Q170,5 185,25" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Eyespot (điểm mắt đỏ) */}
                    <circle cx="125" cy="75" r="4.5" fill="#dc2626" />
                    {/* Chloroplasts (lục lạp) */}
                    <circle cx="120" cy="120" r="5" fill="#15803d" />
                    <circle cx="150" cy="140" r="5" fill="#15803d" />
                    <circle cx="130" cy="170" r="5" fill="#15803d" />
                    {/* Nucleus */}
                    <circle cx="140" cy="155" r="9" fill="#166534" />
                  </g>
                </svg>
              )}
            </div>

            {/* Crosshair scale grid */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-full h-[0.5px] bg-slate-400/25" />
              <div className="h-full w-[0.5px] bg-slate-400/25 absolute" />
              <div className="w-20 h-20 rounded-full border border-slate-400/20 absolute" />
            </div>

            {/* Microscope Vignette effect */}
            <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_0_70px_rgba(0,0,0,0.85)]" />
          </div>

          {/* Labels & Annotations */}
          {showLabels && isSharp && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-md">
              {sample === 'onion' ? (
                <>
                  <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/30 font-medium">
                    🧱 Thành tế bào (xenlulozo bảo vệ)
                  </span>
                  <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30 font-medium">
                    🔵 Nhân tế bào (bắt màu thuốc nhuộm)
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30 font-medium">
                    💧 Không bào lớn trung tâm
                  </span>
                </>
              ) : sample === 'cheek' ? (
                <>
                  <span className="px-2.5 py-1 bg-sky-500/20 text-sky-300 text-xs rounded-full border border-sky-500/30 font-medium">
                    ⭕ Màng sinh chất (Mềm dẻo, không có thành)
                  </span>
                  <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30 font-medium">
                    🟣 Nhân tế bào tròn ở giữa
                  </span>
                </>
              ) : (
                <>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30 font-medium">
                    🌿 Lục lạp (chứa diệp lục)
                  </span>
                  <span className="px-2.5 py-1 bg-rose-500/20 text-rose-300 text-xs rounded-full border border-rose-500/30 font-medium">
                    👁️ Điểm mắt đỏ cảm nhận ánh sáng
                  </span>
                  <span className="px-2.5 py-1 bg-teal-500/20 text-teal-300 text-xs rounded-full border border-teal-500/30 font-medium">
                    〰️ Roi bơi giúp di chuyển
                  </span>
                </>
              )}
            </div>
          )}

          {!isSharp && (
            <div className="mt-3 text-xs text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-lg border border-amber-700/50 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              Hình ảnh chưa rõ nét! Em hãy kéo ốc vi cấp về mức 50% để thấy rõ các bộ phận nhé.
            </div>
          )}
        </div>
      </div>

      {/* Experimental Inquiry Questions */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <h4 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" /> Câu hỏi suy luận thí nghiệm
        </h4>
        <div className="space-y-3">
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-800">
              Q1. Sau khi quan sát, em thấy hình dạng tế bào biểu bì vảy hành khác gì so với tế bào niêm mạc miệng của người? Vì sao?
            </p>
            <p className="text-xs text-slate-600 mt-2 bg-blue-50 p-2.5 rounded-lg border border-blue-100">
              💡 <strong>Gợi ý:</strong> Tế bào vảy hành có thành tế bào bằng cellulose cứng chắc nên có hình đa giác/chữ nhật xếp khít nhau như tường gạch. Tế bào người không có thành tế bào nên có hình tròn dẹp, mềm mại hơn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
