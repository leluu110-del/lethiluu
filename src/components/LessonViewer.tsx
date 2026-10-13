import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, ArrowLeft, Lightbulb, Sparkles, MapPin, Check, ChevronRight } from 'lucide-react';
import { Lesson, LessonSection } from '../types';

interface Props {
  lesson: Lesson;
  onBack: () => void;
  onOpenLab: (topicId: string) => void;
  onAskAI: (topicTitle: string) => void;
}

export const LessonViewer: React.FC<Props> = ({ lesson, onBack, onOpenLab, onAskAI }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(lesson.sections[0].id);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const activeSection = lesson.sections.find((s) => s.id === activeSectionId) || lesson.sections[0];

  const handleSelectOption = (sectionId: string, optionIdx: number) => {
    setChallengeAnswers((prev) => ({ ...prev, [sectionId]: optionIdx }));
    setShowExplanation((prev) => ({ ...prev, [sectionId]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-800 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách bài học
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenLab(lesson.id)}
            className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            🔬 Vào phòng thí nghiệm bài này
          </button>
          <button
            type="button"
            onClick={() => onAskAI(lesson.title)}
            className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            🤖 Hỏi Trợ lý AI
          </button>
        </div>
      </div>

      {/* Lesson Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/20 text-blue-100">
            {lesson.badge}
          </span>
          <span className="text-xs text-blue-200 font-medium">Thời lượng: {lesson.duration}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black">{lesson.title}</h2>
        <p className="text-blue-100 text-xs sm:text-sm mt-1">{lesson.subtitle}</p>
        <p className="text-xs text-blue-100/90 mt-3 pt-3 border-t border-white/20 leading-relaxed max-w-3xl">
          {lesson.overview}
        </p>

        {lesson.localConnection && (
          <div className="mt-3 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 flex items-start gap-2.5 text-xs text-blue-50">
            <MapPin className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-amber-200">Gắn với quê hương Hà Tiên:</strong> {lesson.localConnection}
            </div>
          </div>
        )}
      </div>

      {/* Main Study Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sections Sidebar */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-1">
            Mục lục bài học
          </h3>
          {lesson.sections.map((section, idx) => {
            const isActive = section.id === activeSectionId;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSectionId(section.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="pr-2">
                  <span className={`text-[10px] font-mono block ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                    Phần {idx + 1}
                  </span>
                  <span className="text-xs line-clamp-1">{section.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              </button>
            );
          })}

          {/* Key Takeaways Box */}
          <div className="mt-6 pt-4 border-t border-slate-100 p-3 bg-blue-50/60 rounded-xl border border-blue-100">
            <h4 className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-blue-600" /> Tóm tắt cốt lõi:
            </h4>
            <ul className="space-y-1.5 text-[11px] text-blue-800">
              {lesson.summaryTakeaway.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section Content Display */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{activeSection.title}</h3>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
              {activeSection.content}
            </div>
          </div>

          {/* Interactive Illustration SVG */}
          {activeSection.illustrationSvgType && (
            <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col items-center justify-center relative shadow-inner">
              <span className="text-[11px] text-slate-300 font-mono mb-3 bg-black/40 px-3 py-1 rounded-full">
                Sơ đồ khoa học tương tác trực quan
              </span>

              {activeSection.illustrationSvgType === 'plant_cell' && (
                <svg viewBox="0 0 360 220" className="w-full max-w-sm h-auto">
                  {/* Plant Cell SVG with clear labels */}
                  <rect x="30" y="20" width="300" height="180" rx="20" fill="#065f46" stroke="#10b981" strokeWidth="6" />
                  <rect x="40" y="30" width="280" height="160" rx="14" fill="#047857" stroke="#34d399" strokeWidth="3" />
                  {/* Cytoplasm */}
                  <rect x="46" y="36" width="268" height="148" rx="10" fill="#0f766e" />
                  {/* Vacuole */}
                  <ellipse cx="220" cy="110" rx="65" ry="50" fill="#38bdf8" opacity="0.6" stroke="#bae6fd" strokeWidth="2" />
                  <text x="220" y="114" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Không bào lớn</text>
                  {/* Nucleus */}
                  <circle cx="100" cy="90" r="28" fill="#7c2d12" stroke="#f97316" strokeWidth="2" />
                  <circle cx="100" cy="90" r="10" fill="#fed7aa" />
                  <text x="100" y="130" fill="#ffedd5" fontSize="10" fontWeight="bold" textAnchor="middle">Nhân tế bào</text>
                  {/* Chloroplasts */}
                  <ellipse cx="80" cy="150" rx="16" ry="10" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
                  <ellipse cx="140" cy="155" rx="16" ry="10" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
                  <ellipse cx="150" cy="60" rx="16" ry="10" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
                  <text x="140" y="178" fill="#86efac" fontSize="9" fontWeight="bold" textAnchor="middle">Lục lạp (quang hợp)</text>
                  {/* Labels on top */}
                  <text x="45" y="18" fill="#a7f3d0" fontSize="9" fontWeight="bold">Thành tế bào (Cellulose)</text>
                </svg>
              )}

              {activeSection.illustrationSvgType === 'virus_structure' && (
                <svg viewBox="0 0 340 220" className="w-full max-w-sm h-auto">
                  {/* Bacteriophage Virus Diagram */}
                  <polygon points="170,25 215,50 215,95 170,120 125,95 125,50" fill="#be123c" stroke="#f43f5e" strokeWidth="3" />
                  {/* DNA inside */}
                  <path d="M 150,55 Q 170,45 190,55 T 150,75 T 190,95" fill="none" stroke="#fde047" strokeWidth="2.5" />
                  <text x="170" y="78" fill="#fef08a" fontSize="9" fontWeight="bold" textAnchor="middle">DNA lõi</text>
                  {/* Collar & Sheath */}
                  <rect x="165" y="120" width="10" height="40" fill="#881337" stroke="#e11d48" strokeWidth="2" />
                  <ellipse cx="170" cy="160" rx="16" ry="5" fill="#fda4af" />
                  {/* Tail pins & fibers */}
                  <path d="M 160,162 L 130,195 M 180,162 L 210,195 M 155,162 L 115,175 M 185,162 L 225,175" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Annotation labels */}
                  <text x="240" y="75" fill="#fecdd3" fontSize="10" fontWeight="bold">Vỏ Capsid (Protein)</text>
                  <text x="235" y="145" fill="#fecdd3" fontSize="10" fontWeight="bold">Bao đuôi co rút</text>
                  <text x="90" y="195" fill="#fecdd3" fontSize="10" fontWeight="bold">Sợi lông đuôi</text>
                </svg>
              )}

              {activeSection.illustrationSvgType === 'fungi_types' && (
                <svg viewBox="0 0 360 200" className="w-full max-w-sm h-auto">
                  {/* Mushroom Structure */}
                  <g transform="translate(60, 20)">
                    {/* Cap */}
                    <path d="M 10,70 Q 50,15 90,70 Z" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />
                    {/* Gills under cap */}
                    <line x1="25" y1="70" x2="75" y2="70" stroke="#fde68a" strokeWidth="2" strokeDasharray="3,2" />
                    <text x="50" y="55" fill="#fef3c7" fontSize="9" fontWeight="bold" textAnchor="middle">Mũ nấm</text>
                    {/* Stipe */}
                    <rect x="42" y="70" width="16" height="60" rx="3" fill="#fef3c7" />
                    {/* Ring */}
                    <rect x="38" y="85" width="24" height="4" rx="2" fill="#d97706" />
                    {/* Underground Hyphae */}
                    <path d="M 50,130 Q 30,150 10,160 M 50,130 Q 60,150 80,160" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                    <text x="50" y="175" fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="middle">Sợi nấm ngầm</text>
                  </g>

                  {/* Yeast budding */}
                  <g transform="translate(230, 40)">
                    <circle cx="40" cy="50" r="28" fill="#d97706" stroke="#fbbf24" strokeWidth="2" />
                    <circle cx="70" cy="30" r="14" fill="#f59e0b" stroke="#fde68a" strokeWidth="2" />
                    <text x="40" y="54" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Nấm men mẹ</text>
                    <text x="70" y="33" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">Chồi con</text>
                    <text x="50" y="100" fill="#fed7aa" fontSize="9" fontWeight="bold" textAnchor="middle">Nảy chồi sinh sản</text>
                  </g>
                </svg>
              )}

              {activeSection.illustrationSvgType === 'food_web' && (
                <svg viewBox="0 0 360 200" className="w-full max-w-sm h-auto">
                  {/* Mangrove food chain */}
                  <rect x="20" y="120" width="80" height="45" rx="8" fill="#15803d" />
                  <text x="60" y="140" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">Cây Đước</text>
                  <text x="60" y="153" fill="#bbf7d0" fontSize="8" textAnchor="middle">Sinh vật sản xuất</text>

                  <path d="M 105,142 L 135,142" stroke="#fde047" strokeWidth="3" markerEnd="url(#arrow)" />

                  <rect x="140" y="120" width="80" height="45" rx="8" fill="#0369a1" />
                  <text x="180" y="140" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">Tôm sú / Cá bống</text>
                  <text x="180" y="153" fill="#bae6fd" fontSize="8" textAnchor="middle">Tiêu thụ bậc 1</text>

                  <path d="M 225,142 L 255,142" stroke="#fde047" strokeWidth="3" />

                  <rect x="260" y="120" width="80" height="45" rx="8" fill="#b45309" />
                  <text x="300" y="140" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">Cò trắng / Chim</text>
                  <text x="300" y="153" fill="#fde68a" fontSize="8" textAnchor="middle">Tiêu thụ bậc 2</text>
                </svg>
              )}
            </div>
          )}

          {/* Did You Know Fact */}
          {activeSection.didYouKnow && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-xs font-bold text-amber-900 block">Em có biết?</strong>
                <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">{activeSection.didYouKnow}</p>
              </div>
            </div>
          )}

          {/* Key Points Checklist */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Điểm ghi nhớ quan trọng:
            </h4>
            <div className="space-y-1.5">
              {activeSection.keyPoints.map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Interactive Quiz Challenge */}
          {activeSection.interactiveChallenge && (
            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                  Thử thách hiểu nhanh tại chỗ:
                </h4>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-900">
                {activeSection.interactiveChallenge.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeSection.interactiveChallenge.options.map((opt, oIdx) => {
                  const isSelected = challengeAnswers[activeSection.id] === oIdx;
                  const isCorrect = oIdx === activeSection.interactiveChallenge?.correctIndex;
                  const showResult = showExplanation[activeSection.id];

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectOption(activeSection.id, oIdx)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        showResult && isCorrect
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-bold'
                          : showResult && isSelected && !isCorrect
                          ? 'bg-rose-100 border-rose-300 text-rose-950 font-semibold'
                          : isSelected
                          ? 'bg-blue-600 text-white border-blue-600 font-bold'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt}</span>
                      {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {showExplanation[activeSection.id] && (
                <div className="p-3 bg-white rounded-xl border border-blue-200 text-xs text-blue-900 animate-in fade-in">
                  💡 <strong>Giải thích:</strong> {activeSection.interactiveChallenge.explanation}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
