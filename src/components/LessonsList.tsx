import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight, FlaskConical, Bot, CheckCircle, MapPin } from 'lucide-react';
import { Lesson, TopicId } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';

interface Props {
  onSelectLesson: (topicId: TopicId) => void;
  onSelectLabTopic: (topicId: TopicId) => void;
  onAskAI: (topicTitle: string) => void;
}

export const LessonsList: React.FC<Props> = ({ onSelectLesson, onSelectLabTopic, onAskAI }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = LESSONS_DATA.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.overview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-xs rounded-full text-xs font-semibold text-blue-100 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-yellow-300" /> Chương trình KHTN 6 – Trường TH&THCS Hà Tiên
          </div>
          <h2 className="text-2xl font-black">Khám Phá 4 Chủ Đề Khoa Học Tự Nhiên 6</h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl">
            Bài học được biên soạn sinh động, có sơ đồ tương tác, câu hỏi củng cố nhanh và gắn liền với môi trường sinh thái biển Hà Tiên.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm bài học..."
            className="w-full pl-9 pr-4 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-semibold focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Grid of lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((lesson) => {
          return (
            <div
              key={lesson.id}
              className="bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-400 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    {lesson.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{lesson.duration}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{lesson.title}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">{lesson.subtitle}</p>

                <p className="text-xs text-slate-700 mt-3 leading-relaxed line-clamp-3">
                  {lesson.overview}
                </p>

                {lesson.localConnection && (
                  <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2"><strong>Địa phương:</strong> {lesson.localConnection}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onSelectLesson(lesson.id)}
                  className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all"
                >
                  Đọc bài học chi tiết <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onSelectLabTopic(lesson.id)}
                    className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-all"
                    title="Mở thí nghiệm ảo của bài này"
                  >
                    <FlaskConical className="w-4 h-4 text-emerald-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onAskAI(lesson.title)}
                    className="p-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-xl text-xs font-bold transition-all"
                    title="Hỏi trợ lý AI về chủ đề này"
                  >
                    <Bot className="w-4 h-4 text-indigo-600" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
