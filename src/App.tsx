import React, { useState, useEffect } from 'react';
import { TabType, TopicId, QuizAttempt, LabObservationLog } from './types';
import { LESSONS_DATA } from './data/lessonsData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OfflineNotice } from './components/OfflineNotice';
import { HomeSection } from './components/HomeSection';
import { LessonsList } from './components/LessonsList';
import { LessonViewer } from './components/LessonViewer';
import { LabHub } from './components/LabHub';
import { QuizSection } from './components/QuizSection';
import { AchievementsSection } from './components/AchievementsSection';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { Bot, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedLessonId, setSelectedLessonId] = useState<TopicId | null>(null);
  const [selectedLabTopic, setSelectedLabTopic] = useState<TopicId>('cell_organism');

  // Network online/offline detection
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // Modals & Drawers
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState<boolean>(false);
  const [aiDrawerTopic, setAiDrawerTopic] = useState<string>('Khoa học Tự nhiên 6');
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState<boolean>(false);

  // Local Storage Data
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);
  const [labLogs, setLabLogs] = useState<LabObservationLog[]>([]);

  // Load saved history on mount
  useEffect(() => {
    try {
      const savedQuizzes = localStorage.getItem('khtn6_quiz_history');
      if (savedQuizzes) setQuizHistory(JSON.parse(savedQuizzes));

      const savedLogs = localStorage.getItem('khtn6_lab_logs');
      if (savedLogs) setLabLogs(JSON.parse(savedLogs));
    } catch (e) {
      console.error('Error loading localStorage:', e);
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save quiz attempt
  const handleSaveQuizAttempt = (attempt: QuizAttempt) => {
    const updated = [attempt, ...quizHistory];
    setQuizHistory(updated);
    try {
      localStorage.setItem('khtn6_quiz_history', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving quiz attempt:', e);
    }
  };

  // Clear quiz history
  const handleClearHistory = () => {
    if (window.confirm('Em có chắc chắn muốn xóa lịch sử điểm trắc nghiệm này không?')) {
      setQuizHistory([]);
      localStorage.removeItem('khtn6_quiz_history');
    }
  };

  // Save lab observation log
  const handleSaveLabLog = (logData: Omit<LabObservationLog, 'id' | 'timestamp'>) => {
    const newLog: LabObservationLog = {
      ...logData,
      id: String(Date.now()),
      timestamp: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    const updated = [newLog, ...labLogs];
    setLabLogs(updated);
    try {
      localStorage.setItem('khtn6_lab_logs', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving lab log:', e);
    }
  };

  // Clear lab logs
  const handleClearLabLogs = () => {
    if (window.confirm('Em có chắc muốn xóa sổ tay nhật ký thí nghiệm không?')) {
      setLabLogs([]);
      localStorage.removeItem('khtn6_lab_logs');
    }
  };

  // Select a lesson to view
  const handleSelectLesson = (topicId: TopicId) => {
    setSelectedLessonId(topicId);
    setActiveTab('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Jump to specific lab
  const handleSelectLabTopic = (topicId: TopicId) => {
    setSelectedLabTopic(topicId);
    setActiveTab('lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open AI with context
  const handleOpenAI = (topicTitle?: string) => {
    if (topicTitle) setAiDrawerTopic(topicTitle);
    setIsAIDrawerOpen(true);
  };

  const currentLesson = LESSONS_DATA.find((l) => l.id === selectedLessonId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Offline Status Alert if disconnected */}
      <OfflineNotice isOnline={isOnline} />

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'lessons') setSelectedLessonId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOnline={isOnline}
        onOpenAI={() => handleOpenAI('Khoa học Tự nhiên 6')}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        labLogsCount={labLogs.length}
        quizHistoryCount={quizHistory.length}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <HomeSection
            onTabChange={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectLesson={handleSelectLesson}
            onSelectLabTopic={handleSelectLabTopic}
            onOpenAI={() => handleOpenAI('Khám phá KHTN 6')}
            onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
          />
        )}

        {activeTab === 'lessons' && (
          <>
            {currentLesson ? (
              <LessonViewer
                lesson={currentLesson}
                onBack={() => setSelectedLessonId(null)}
                onOpenLab={(id) => handleSelectLabTopic(id as TopicId)}
                onAskAI={(title) => handleOpenAI(title)}
              />
            ) : (
              <LessonsList
                onSelectLesson={handleSelectLesson}
                onSelectLabTopic={handleSelectLabTopic}
                onAskAI={(title) => handleOpenAI(title)}
              />
            )}
          </>
        )}

        {activeTab === 'lab' && (
          <LabHub
            initialTopic={selectedLabTopic}
            onSaveLog={handleSaveLabLog}
            onOpenAI={(title) => handleOpenAI(title)}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizSection onAttemptSaved={handleSaveQuizAttempt} />
        )}

        {activeTab === 'achievements' && (
          <AchievementsSection
            quizHistory={quizHistory}
            labLogs={labLogs}
            onClearHistory={handleClearHistory}
            onClearLogs={handleClearLabLogs}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'lessons') setSelectedLessonId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        onOpenAI={() => handleOpenAI('Trợ lý Khoa học Tự nhiên 6')}
      />

      {/* Floating AI Assistant Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => handleOpenAI('Khoa học Tự nhiên 6')}
          className="group relative flex items-center gap-2.5 py-3 px-4 sm:px-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 transition-all transform hover:scale-105"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-yellow-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
          </div>
          <span className="text-xs sm:text-sm">Trợ lý AI KHTN</span>
        </button>
      </div>

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAIDrawerOpen}
        onClose={() => setIsAIDrawerOpen(false)}
        isOnline={isOnline}
        currentTopicTitle={aiDrawerTopic}
      />

      {/* Teacher Guide Modal */}
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />
    </div>
  );
}
