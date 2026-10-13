import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, Sparkles, Filter, BookmarkCheck, Star } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizAttempt, TopicId } from '../types';

interface Props {
  onAttemptSaved: (attempt: QuizAttempt) => void;
}

export const QuizSection: React.FC<Props> = ({ onAttemptSaved }) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>('all');
  const [studentName, setStudentName] = useState<string>('Học sinh 6A1');
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);

  // Load last nickname from storage if exists
  useEffect(() => {
    const savedName = localStorage.getItem('khtn6_student_nickname');
    if (savedName) setStudentName(savedName);
  }, []);

  const filteredQuestions = QUIZ_QUESTIONS.filter(
    (q) => selectedTopic === 'all' || q.topicId === selectedTopic
  );

  const handleStart = () => {
    if (!studentName.trim()) setStudentName('Học sinh Hà Tiên');
    localStorage.setItem('khtn6_student_nickname', studentName);
    setIsStarted(true);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setStartTime(Date.now());
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    filteredQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const correctCount = calculateScore();
    const total = filteredQuestions.length;
    const percentage = Math.round((correctCount / total) * 100);
    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);

    let badge = 'Cố gắng lên nào!';
    if (percentage === 100) badge = '🏆 Nhà Khoa Học Nhí Xuất Sắc';
    else if (percentage >= 80) badge = '🥇 Chuyên Gia Sinh Học Tài Năng';
    else if (percentage >= 50) badge = '🥈 Nhà Thám Hiểm Chăm Chỉ';

    const topicLabel =
      selectedTopic === 'all'
        ? 'Tổng ôn KHTN 6'
        : selectedTopic === 'cell_organism'
        ? 'Cơ thể sinh vật & Tế bào'
        : selectedTopic === 'virus'
        ? 'Virus'
        : selectedTopic === 'fungi'
        ? 'Nấm'
        : 'Đa dạng sinh học';

    const attempt: QuizAttempt = {
      id: String(Date.now()),
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      topicId: selectedTopic,
      topicName: topicLabel,
      studentName: studentName || 'Học sinh Hà Tiên',
      studentClass: 'Lớp 6',
      score: correctCount,
      totalQuestions: total,
      percentage,
      badgeAwarded: badge,
      timeSpentSeconds
    };

    onAttemptSaved(attempt);
  };

  const currentQ = filteredQuestions[currentIndex];
  const isAnswered = currentQ ? selectedAnswers[currentQ.id] !== undefined : false;
  const correctCount = calculateScore();
  const totalQuestions = filteredQuestions.length;

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-xs rounded-full text-xs font-semibold text-blue-100 mb-2">
            <Award className="w-3.5 h-3.5 text-yellow-300" /> Tự chấm điểm & Lưu kết quả tại chỗ
          </div>
          <h2 className="text-2xl font-black">Thử Thách Trắc Nghiệm KHTN 6</h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl">
            Luyện tập các câu hỏi kiểm tra chuẩn kiến thức TH&THCS Hà Tiên. Tự động chấm điểm, giải thích chi tiết từng câu và vinh danh trên bảng thành tích.
          </p>
        </div>

        {!isStarted && (
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex flex-col gap-2 min-w-[220px]">
            <label className="text-xs font-semibold text-blue-100">Biệt danh / Tên học sinh:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="VD: Minh Anh 6A1"
              className="bg-white text-slate-900 px-3 py-2 text-xs rounded-lg font-bold focus:outline-none"
            />
            <span className="text-[10px] text-blue-200">Không yêu cầu thông tin cá nhân hay tài khoản.</span>
          </div>
        )}
      </div>

      {/* Before Starting: Topic Selection Screen */}
      {!isStarted && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-blue-600" /> Chọn bộ câu hỏi luyện tập:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { id: 'all', title: 'Tổng ôn cả 4 chủ đề', count: QUIZ_QUESTIONS.length, color: 'border-blue-500 bg-blue-50/50' },
                { id: 'cell_organism', title: 'Cơ thể sinh vật & Tế bào', count: QUIZ_QUESTIONS.filter((q) => q.topicId === 'cell_organism').length, color: 'border-emerald-500 bg-emerald-50/30' },
                { id: 'virus', title: 'Virus & Phòng chống', count: QUIZ_QUESTIONS.filter((q) => q.topicId === 'virus').length, color: 'border-rose-500 bg-rose-50/30' },
                { id: 'fungi', title: 'Thế giới Loài Nấm', count: QUIZ_QUESTIONS.filter((q) => q.topicId === 'fungi').length, color: 'border-amber-500 bg-amber-50/30' },
                { id: 'biodiversity', title: 'Đa dạng sinh học & Hà Tiên', count: QUIZ_QUESTIONS.filter((q) => q.topicId === 'biodiversity').length, color: 'border-cyan-500 bg-cyan-50/30' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedTopic(item.id as any)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedTopic === item.id
                      ? `${item.color} shadow-sm font-bold ring-2 ring-blue-500/20`
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-800">{item.title}</p>
                  <span className="text-[11px] text-slate-500 font-mono mt-1 block">{item.count} câu hỏi</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={handleStart}
              className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
            >
              Bắt đầu làm bài ({filteredQuestions.length} câu) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Taking Quiz Mode */}
      {isStarted && !isSubmitted && currentQ && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          {/* Progress bar & Question counter */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2">
              <span>Câu hỏi {currentIndex + 1} / {totalQuestions}</span>
              <span className="text-blue-600 font-mono">
                Đã chọn: {Object.keys(selectedAnswers).length}/{totalQuestions} câu
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                Câu {currentIndex + 1}
              </span>
              <span className="text-xs text-slate-500">
                {currentQ.topicId === 'cell_organism' ? 'Cơ thể sinh vật' : currentQ.topicId === 'virus' ? 'Virus' : currentQ.topicId === 'fungi' ? 'Nấm' : currentQ.topicId === 'biodiversity' ? 'Đa dạng sinh học' : 'Vận dụng'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;
              const letter = ['A', 'B', 'C', 'D'][optIdx];
              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className={`text-xs sm:text-sm pt-0.5 ${isSelected ? 'font-bold text-blue-950' : 'text-slate-800'}`}>
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stepper navigation */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="py-2.5 px-4 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
            >
              Câu trước
            </button>

            {/* Quick dot navigation */}
            <div className="hidden md:flex gap-1">
              {filteredQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-6 h-6 rounded-md text-[10px] font-bold transition-all ${
                    currentIndex === idx
                      ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                      : selectedAnswers[q.id] !== undefined
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
              >
                Câu tiếp theo
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <BookmarkCheck className="w-4 h-4" /> Nộp bài & Chấm điểm
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results & Detailed Review Screen */}
      {isSubmitted && (
        <div className="space-y-6">
          {/* Score Summary Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-3">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Kết Quả Bài Làm Của {studentName}
            </h3>
            <div className="my-4 inline-flex items-center gap-3 bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl">
              <div>
                <span className="text-xs text-slate-500 block">Số câu đúng</span>
                <span className="text-2xl font-black text-blue-600">{correctCount} / {totalQuestions}</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-xs text-slate-500 block">Điểm quy đổi</span>
                <span className="text-2xl font-black text-emerald-600">
                  {((correctCount / totalQuestions) * 10).toFixed(1)} / 10
                </span>
              </div>
            </div>

            {/* Badge */}
            <div className="max-w-md mx-auto p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-yellow-200 rounded-xl text-xs font-bold text-amber-900 flex items-center justify-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              {correctCount === totalQuestions
                ? 'Xuất sắc tuyệt đối! Em là một nhà khoa học nhí thực thụ!'
                : correctCount >= totalQuestions * 0.8
                ? 'Giỏi lắm! Em nắm rất vững kiến thức Khoa học tự nhiên 6!'
                : 'Làm tốt lắm! Em hãy xem lại các câu chưa đúng bên dưới để hoàn thiện nhé!'}
            </div>

            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={handleStart}
                className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs"
              >
                <RotateCcw className="w-4 h-4" /> Làm lại bài này
              </button>
              <button
                type="button"
                onClick={() => { setIsStarted(false); setIsSubmitted(false); }}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Chọn bộ đề khác
              </button>
            </div>
          </div>

          {/* Detailed Question Explanations */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 text-base">Xem lại chi tiết đáp án & lời giải</h4>

            <div className="space-y-4">
              {filteredQuestions.map((q, idx) => {
                const userChoice = selectedAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border-2 ${
                      isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                          Câu {idx + 1}
                        </span>
                        {isCorrect ? (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Đúng (+1)
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                            <XCircle className="w-4 h-4 text-rose-600" /> Chưa chính xác
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-3">{q.question}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                      {q.options.map((opt, oIdx) => {
                        const isCorrectOption = oIdx === q.correctIndex;
                        const isChosenOption = oIdx === userChoice;

                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                              isCorrectOption
                                ? 'bg-emerald-100/80 border-emerald-300 font-bold text-emerald-950'
                                : isChosenOption
                                ? 'bg-rose-100/80 border-rose-300 font-semibold text-rose-950'
                                : 'bg-white border-slate-200 text-slate-600'
                            }`}
                          >
                            <span className="font-bold">
                              {['A', 'B', 'C', 'D'][oIdx]}.
                            </span>
                            <span>{opt}</span>
                            {isCorrectOption && <span className="ml-auto text-[10px] text-emerald-800 font-bold">✓ Đáp án đúng</span>}
                            {isChosenOption && !isCorrectOption && <span className="ml-auto text-[10px] text-rose-800 font-bold">✗ Em đã chọn</span>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                      <strong className="text-blue-700 block mb-1">💡 Lời giải chi tiết:</strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
