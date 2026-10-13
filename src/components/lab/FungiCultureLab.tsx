import React, { useState } from 'react';
import { Sparkles, Calendar, Thermometer, Droplets, Sun, CheckCircle2, BookmarkPlus, Info } from 'lucide-react';
import { LabObservationLog } from '../../types';

interface Props {
  onSaveLog: (log: Omit<LabObservationLog, 'id' | 'timestamp'>) => void;
}

export const FungiCultureLab: React.FC<Props> = ({ onSaveLog }) => {
  const [substrate, setSubstrate] = useState<'bread' | 'rice' | 'orange' | 'plastic'>('bread');
  const [temp, setTemp] = useState<number>(30); // 4, 20, 30, 60
  const [humidity, setHumidity] = useState<number>(85); // 15, 50, 85
  const [light, setLight] = useState<'dark' | 'bright'>('dark');
  const [day, setDay] = useState<number>(3); // 0 to 7
  const [prediction, setPrediction] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Growth calculation formula
  // Optimal: Substrate has organic nutrients (not plastic), temp 25-35C, humidity > 70%, dark/moderate light
  const calculateGrowthPercentage = (currentDay: number): number => {
    if (substrate === 'plastic') return 0; // Plastic has no organic nutrients!
    if (currentDay === 0) return 0;

    let growthFactor = 1.0;
    // Temperature effect
    if (temp <= 4) growthFactor *= 0.05; // Fridge halts mold
    else if (temp >= 55) growthFactor *= 0; // High heat destroys spores
    else if (temp >= 25 && temp <= 35) growthFactor *= 1.3; // Tropical optimal

    // Humidity effect
    if (humidity < 30) growthFactor *= 0.15; // Dry stops mold
    else if (humidity > 70) growthFactor *= 1.4; // Damp speeds mold

    // Light
    if (light === 'bright') growthFactor *= 0.8;

    const baseGrowth = (currentDay / 7) * 90;
    const result = Math.min(100, Math.round(baseGrowth * growthFactor));
    return result;
  };

  const growthPct = calculateGrowthPercentage(day);

  const handleSave = () => {
    onSaveLog({
      labTitle: 'Nuôi cấy Nấm mốc & Khảo sát điều kiện môi trường sống của Nấm',
      studentPrediction: prediction || 'Chưa chọn dự đoán',
      conditionsApplied: {
        substrate: substrate === 'bread' ? 'Bánh mì' : substrate === 'rice' ? 'Cơm nguội' : substrate === 'orange' ? 'Quả cam' : 'Miếng nhựa',
        temperature: `${temp}°C`,
        humidity: `${humidity}%`,
        light: light === 'dark' ? 'Trong tối' : 'Ngoài sáng',
        day: `Ngày thứ ${day}`,
        growthCover: `${growthPct}%`
      },
      conclusion: substrate === 'plastic'
        ? 'Nấm mốc là sinh vật dị dưỡng, không thể phát triển trên đồ nhựa vô cơ vì không có chất hữu cơ để hấp thụ.'
        : temp <= 4
        ? 'Ở nhiệt độ ngăn lạnh (4°C), nấm mốc hầu như không phát triển, chứng minh để đồ ăn vào tủ lạnh giúp bảo quản lâu hơn.'
        : humidity > 70 && temp === 30
        ? `Nhiệt độ ấm (30°C) và độ ẩm cao (${humidity}%) là điều kiện lý tưởng làm nấm mốc phát triển bùng nổ đến ${growthPct}%, sinh nhiều túi bào tử đen.`
        : 'Độ ẩm và nhiệt độ là hai yếu tố quyết định tốc độ nảy mầm của bào tử nấm mốc.'
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-600 text-white rounded-xl shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-amber-900 text-lg">Mục tiêu: Thí nghiệm Nuôi cấy Nấm mốc (KHTN 6)</h3>
            <p className="text-sm text-amber-800 mt-1">
              Tìm hiểu xem nhiệt độ, độ ẩm và loại vật chất nào sẽ làm cho nấm mốc phát triển nhanh nhất, từ đó rút ra bài học bảo quản thực phẩm tại gia đình.
            </p>

            <div className="mt-4 pt-3 border-t border-amber-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                Dự đoán của em: Đặt mẫu vật ở đâu thì nấm mốc sẽ mọc nhiều nhất sau 5 ngày?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {[
                  'Bánh mì để trong ngăn đá tủ lạnh khô ráo',
                  'Bánh mì vẩy ẩm đặt ở góc tủ bếp ấm áp (30°C)',
                  'Miếng nhựa sạch để ngoài nắng'
                ].map((text, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrediction(text)}
                    className={`text-left text-xs p-3 rounded-xl border transition-all ${
                      prediction === text
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm font-semibold'
                        : 'bg-white text-amber-950 border-amber-200 hover:bg-amber-100/60'
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
          <h4 className="font-bold text-slate-800 text-base">Điều chỉnh điều kiện môi trường</h4>

          {/* Substrate */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-2">1. Giá thể nuôi cấy:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSubstrate('bread')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  substrate === 'bread' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                🍞 Lát bánh mì tinh bột
              </button>
              <button
                type="button"
                onClick={() => setSubstrate('rice')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  substrate === 'rice' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                🍚 Bát cơm nguội
              </button>
              <button
                type="button"
                onClick={() => setSubstrate('orange')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  substrate === 'orange' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                🍊 Quả cam chín
              </button>
              <button
                type="button"
                onClick={() => setSubstrate('plastic')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  substrate === 'plastic' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                ⚪ Miếng nhựa (Đối chứng vô cơ)
              </button>
            </div>
          </div>

          {/* Temperature */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-rose-500" /> 2. Nhiệt độ môi trường:
              </label>
              <span className="text-xs font-bold text-amber-700">{temp}°C</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: '4°C (Tủ lạnh)', val: 4 },
                { label: '20°C (Mát)', val: 20 },
                { label: '30°C (Ấm Hà Tiên)', val: 30 },
                { label: '60°C (Nóng)', val: 60 }
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setTemp(item.val)}
                  className={`py-2 px-1 text-[11px] font-semibold text-center rounded-lg border transition-all ${
                    temp === item.val ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Moisture */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-blue-500" /> 3. Độ ẩm giá thể:
              </label>
              <span className="text-xs font-bold text-blue-700">{humidity}%</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Khô ráo (15%)', val: 15 },
                { label: 'Vừa phải (50%)', val: 50 },
                { label: 'Rất ẩm (85%)', val: 85 }
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setHumidity(item.val)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    humidity === item.val ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Light */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-1">4. Điều kiện ánh sáng:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLight('dark')}
                className={`py-2 text-xs font-semibold rounded-lg border ${
                  light === 'dark' ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                🌑 Tủ kín bóng tối
              </button>
              <button
                type="button"
                onClick={() => setLight('bright')}
                className={`py-2 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1 ${
                  light === 'bright' ? 'bg-amber-500 text-white' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Ngoài sáng
              </button>
            </div>
          </div>

          {/* Day Stepper */}
          <div className="pt-3 border-t border-slate-200">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" /> 5. Thời gian quan sát:
              </label>
              <span className="text-xs font-extrabold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                Ngày thứ {day} / 7
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="7"
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>Ngày 0 (Mới đặt)</span>
              <span>Ngày 3 (Bắt đầu mọc)</span>
              <span>Ngày 7 (Phát triển kín)</span>
            </div>
          </div>

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
              Đã ghi vào sổ tay học tập!
            </div>
          )}
        </div>

        {/* Visual Specimen Dish & Graph */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 flex flex-col justify-between relative shadow-inner text-white">
          <div className="flex items-center justify-between z-10">
            <span className="px-3 py-1 bg-black/60 rounded-lg text-xs font-mono text-slate-200">
              Đĩa petri: {substrate === 'bread' ? 'Bánh mì' : substrate === 'rice' ? 'Cơm nguội' : substrate === 'orange' ? 'Quả cam' : 'Nhựa vô cơ'}
            </span>
            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${growthPct > 50 ? 'bg-rose-500/30 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'}`}>
              Độ che phủ mốc: {growthPct}%
            </span>
          </div>

          {/* Petri Dish Graphic */}
          <div className="my-6 flex items-center justify-center">
            <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border-8 border-slate-700/80 bg-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.6)] flex items-center justify-center relative overflow-hidden">
              {/* Dish glass texture */}
              <div className="absolute inset-0 rounded-full bg-radial from-slate-700/40 to-slate-900 pointer-events-none" />

              {/* Bread / Rice / Orange specimen */}
              {substrate === 'bread' && (
                <div className="w-[180px] h-[180px] bg-amber-100 rounded-3xl border-4 border-amber-300 shadow-lg relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-1 border-2 border-amber-200/60 rounded-2xl pointer-events-none" />

                  {/* Mold clusters expanding */}
                  {growthPct > 0 && (
                    <svg viewBox="0 0 180 180" className="absolute inset-0 w-full h-full pointer-events-none">
                      {/* Hyphae strands */}
                      {growthPct > 15 && (
                        <g stroke="#334155" strokeWidth="1" opacity="0.6">
                          <line x1="90" y1="90" x2="60" y2="70" />
                          <line x1="90" y1="90" x2="120" y2="60" />
                          <line x1="90" y1="90" x2="110" y2="120" />
                          <line x1="90" y1="90" x2="70" y2="110" />
                        </g>
                      )}
                      {/* Mold spots */}
                      <circle cx="90" cy="90" r={Math.min(75, growthPct * 0.8)} fill="#064e3b" opacity="0.75" />
                      <circle cx="65" cy="75" r={Math.min(50, growthPct * 0.55)} fill="#1e293b" opacity="0.8" />
                      <circle cx="120" cy="110" r={Math.min(45, growthPct * 0.5)} fill="#047857" opacity="0.7" />
                      <circle cx="110" cy="70" r={Math.min(40, growthPct * 0.45)} fill="#0f172a" opacity="0.85" />
                      {/* Spore heads */}
                      {growthPct > 40 && (
                        <g fill="#022c22">
                          <circle cx="85" cy="85" r="3" />
                          <circle cx="95" cy="95" r="3.5" />
                          <circle cx="70" cy="75" r="2.5" />
                          <circle cx="115" cy="105" r="3" />
                        </g>
                      )}
                    </svg>
                  )}
                </div>
              )}

              {substrate === 'rice' && (
                <div className="w-[180px] h-[180px] bg-slate-100 rounded-full border-4 border-slate-300 shadow-lg relative overflow-hidden flex items-center justify-center">
                  <div className="text-slate-400 text-xs font-semibold">Cơm nguội</div>
                  {growthPct > 0 && (
                    <div
                      className="absolute inset-4 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: '#eab308',
                        opacity: growthPct / 100 * 0.8,
                        filter: 'blur(3px)'
                      }}
                    />
                  )}
                  {growthPct > 30 && (
                    <div
                      className="absolute inset-8 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: '#b91c1c',
                        opacity: growthPct / 100 * 0.85,
                        filter: 'blur(2px)'
                      }}
                    />
                  )}
                </div>
              )}

              {substrate === 'orange' && (
                <div className="w-[180px] h-[180px] bg-orange-500 rounded-full border-4 border-orange-600 shadow-lg relative overflow-hidden flex items-center justify-center">
                  {growthPct > 0 && (
                    <div
                      className="absolute inset-6 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: '#10b981',
                        opacity: growthPct / 100 * 0.9,
                        border: '4px solid #ffffff'
                      }}
                    />
                  )}
                </div>
              )}

              {substrate === 'plastic' && (
                <div className="w-[180px] h-[180px] bg-slate-300/40 rounded-2xl border-4 border-dashed border-slate-400 flex flex-col items-center justify-center p-3 text-center">
                  <span className="text-2xl mb-1">🚫</span>
                  <span className="text-xs text-slate-300 font-bold">Chất vô cơ (Nhựa)</span>
                  <span className="text-[10px] text-slate-400 mt-1">Không có chất hữu cơ để nấm hấp thụ dinh dưỡng!</span>
                </div>
              )}
            </div>
          </div>

          {/* Scientific Insight & Food Preservation Tips */}
          <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
              <Info className="w-4 h-4" /> Kết luận khoa học rút ra:
            </div>
            <p className="text-xs text-slate-300">
              {substrate === 'plastic'
                ? 'Nấm là sinh vật dị dưỡng, chỉ sống được trên chất hữu cơ. Bề mặt vô cơ như nhựa không có thức ăn nên nấm không thể mọc!'
                : temp <= 4
                ? 'Để thức ăn trong ngăn mát tủ lạnh (4°C) làm chậm đáng kể sự nảy mầm của bào tử nấm. Đây là cách bảo quản thực phẩm rất tốt!'
                : humidity < 30
                ? 'Môi trường khô ráo ngăn cản bào tử hút nước để nảy mầm. Vì thế phơi khô cá, mực, lúa thóc ở Hà Tiên giúp giữ được rất lâu!'
                : 'Khí hậu ấm nóng (30°C) và độ ẩm cao tạo điều kiện hoàn hảo để nấm mốc phát triển bùng nổ chỉ sau 2-3 ngày.'}
            </p>
          </div>
        </div>
      </div>

      {/* Practical application */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <h4 className="font-bold text-slate-800 text-base mb-2">
          🍳 Ứng dụng thực tế cho học sinh và gia đình
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <strong className="text-blue-700 block mb-1">1. Giữ thực phẩm khô ráo</strong>
            Bánh mì, bánh quy nên đậy kín trong hộp, để nơi thoáng mát hoặc dùng gói hút ẩm để nấm mốc không nảy mầm.
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <strong className="text-emerald-700 block mb-1">2. Tận dụng tủ lạnh</strong>
            Nhiệt độ 4°C ức chế enzyme của nấm, giúp thức ăn chín để được từ 2 - 4 ngày mà không bị thiu mốc.
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <strong className="text-rose-700 block mb-1">3. Không ăn thức ăn mốc</strong>
            Độc tố nấm mốc (như Aflatoxin) ngấm sâu vào ruột bánh, dù gọt bỏ lớp vỏ mốc bên ngoài ăn vào vẫn ngộ độc gan!
          </div>
        </div>
      </div>
    </div>
  );
};
