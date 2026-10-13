import React, { useState } from 'react';
import { Microscope, ShieldAlert, Sparkles, Globe, FlaskConical, BookmarkCheck, Bot } from 'lucide-react';
import { TopicId, LabObservationLog } from '../types';
import { MicroscopeLab } from './lab/MicroscopeLab';
import { VirusInfectionLab } from './lab/VirusInfectionLab';
import { FungiCultureLab } from './lab/FungiCultureLab';
import { BiodiversityLab } from './lab/BiodiversityLab';

interface Props {
  initialTopic?: TopicId;
  onSaveLog: (log: Omit<LabObservationLog, 'id' | 'timestamp'>) => void;
  onOpenAI: (topicTitle: string) => void;
}

export const LabHub: React.FC<Props> = ({ initialTopic = 'cell_organism', onSaveLog, onOpenAI }) => {
  const [activeTab, setActiveTab] = useState<TopicId>(initialTopic);

  const labList = [
    {
      id: 'cell_organism' as TopicId,
      title: 'Kính hiển vi: Tế bào vảy hành',
      shortTitle: '1. Kính hiển vi ảo',
      icon: Microscope,
      badge: 'Cơ thể sinh vật',
      color: 'blue'
    },
    {
      id: 'virus' as TopicId,
      title: 'Mô phỏng: Nhân lên của Virus',
      shortTitle: '2. Chu trình Virus',
      icon: ShieldAlert,
      badge: 'Virus & Vaccine',
      color: 'rose'
    },
    {
      id: 'fungi' as TopicId,
      title: 'Thí nghiệm: Nuôi cấy Nấm mốc',
      shortTitle: '3. Nuôi cấy Nấm mốc',
      icon: Sparkles,
      badge: 'Thế giới Loài Nấm',
      color: 'amber'
    },
    {
      id: 'biodiversity' as TopicId,
      title: 'Cân bằng Sinh thái Rừng ngập mặn',
      shortTitle: '4. Đa dạng sinh học Hà Tiên',
      icon: Globe,
      badge: 'Đa dạng sinh học',
      color: 'cyan'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-xs rounded-full text-xs font-semibold text-blue-100 mb-2">
            <FlaskConical className="w-3.5 h-3.5 text-yellow-300" /> Thực hành KHTN 6 tương tác
          </div>
          <h2 className="text-2xl font-black">Phòng Thí Nghiệm Khoa Học Ảo</h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl">
            Thao tác trực tiếp với các biến số: nhiệt độ, ánh sáng, thuốc nhuộm, kính hiển vi, vaccine và hệ sinh thái đầm Đông Hồ Hà Tiên.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenAI(labList.find((l) => l.id === activeTab)?.title || 'Thí nghiệm ảo')}
          className="self-start md:self-center px-4 py-2.5 bg-white/15 hover:bg-white/25 border border-white/25 rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-all backdrop-blur-md"
        >
          <Bot className="w-4 h-4 text-yellow-300" /> Hỏi Trợ lý AI về thí nghiệm này
        </button>
      </div>

      {/* Lab Tabs Nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {labList.map((lab) => {
          const Icon = lab.icon;
          const isActive = activeTab === lab.id;

          return (
            <button
              key={lab.id}
              type="button"
              onClick={() => setActiveTab(lab.id)}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-600'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className={`text-[10px] block font-semibold ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                  {lab.badge}
                </span>
                <span className="text-xs font-bold line-clamp-1">{lab.shortTitle}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lab Simulation Container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        {activeTab === 'cell_organism' && <MicroscopeLab onSaveLog={onSaveLog} />}
        {activeTab === 'virus' && <VirusInfectionLab onSaveLog={onSaveLog} />}
        {activeTab === 'fungi' && <FungiCultureLab onSaveLog={onSaveLog} />}
        {activeTab === 'biodiversity' && <BiodiversityLab onSaveLog={onSaveLog} />}
      </div>
    </div>
  );
};
