import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, X, Volume2, Wifi, WifiOff, HelpCircle, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isOnline: boolean;
  currentTopicTitle?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  source?: 'gemini-3.8-flash' | 'built-in-knowledge' | 'offline-fallback';
  timestamp: string;
}

const QUICK_QUESTIONS = [
  'Tại sao tế bào thực vật lại có hình dạng cứng cáp hơn tế bào người?',
  'Tại sao bị cảm sốt do virus thì không nên tự uống kháng sinh?',
  'Nấm men làm cho bột bánh mì nở phồng xốp như thế nào?',
  'Rừng ngập mặn đầm Đông Hồ ở Hà Tiên có vai trò gì quan trọng?'
];

export const AIAssistantDrawer: React.FC<Props> = ({ isOpen, onClose, isOnline, currentTopicTitle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Chào em! Thầy/Cô AI Science Lab rất vui được đồng hành cùng em khám phá KHTN 6 tại Trường TH&THCS Hà Tiên. Em đang băn khoăn điều gì về tế bào, virus, nấm hay thế giới tự nhiên kỳ thú nào?',
      source: 'gemini-3.8-flash',
      timestamp: 'Vừa xong'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input.trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setIsLoading(true);

    // If strictly offline in browser
    if (!isOnline) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            sender: 'ai',
            text: '📶 [Chế độ ngoại tuyến]\nChào em! Hiện tại thiết bị đang không có kết nối Internet nên trợ lý AI trực tuyến tạm thời không hoạt động.\n\n💡 Nhưng em đừng lo: Toàn bộ bài học, kính hiển vi ảo và bài tập trắc nghiệm đã được lưu sẵn trên máy của em! Em hãy chuyển sang tab "Phòng thí nghiệm" hoặc "Bài học" để tự khám phá câu trả lời nhé!',
            source: 'offline-fallback',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          topic: currentTopicTitle,
        })
      });

      if (!res.ok) throw new Error('Mạng bị gián đoạn');

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: data.reply || 'Chào em, câu hỏi của em rất thú vị! Em hãy quan sát thêm các mô phỏng trong phòng thí nghiệm nhé.',
          source: data.source,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: 'Thầy/Cô AI trực tuyến tạm thời đang gián đoạn kết nối. Nhưng em hãy yên tâm, các mô phỏng phòng thí nghiệm và bài học KHTN 6 vẫn đang hoạt động rất tốt!',
          source: 'offline-fallback',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Clean markdown stars
      const cleanText = text.replace(/[*_#`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'vi-VN';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Bot className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm tracking-wide">Trợ Lý KHTN 6 – AI Lab</h3>
                {isOnline ? (
                  <span className="flex items-center gap-1 text-[10px] bg-emerald-500/25 text-emerald-100 border border-emerald-400/30 px-1.5 py-0.5 rounded-full font-medium">
                    <Wifi className="w-2.5 h-2.5 text-emerald-300" /> Trực tuyến
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] bg-amber-500/25 text-amber-100 border border-amber-400/30 px-1.5 py-0.5 rounded-full font-medium">
                    <WifiOff className="w-2.5 h-2.5 text-amber-300" /> Ngoại tuyến
                  </span>
                )}
              </div>
              <p className="text-[11px] text-blue-100">Giải thích dễ hiểu & gợi mở suy luận</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg text-white/90 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offline Warning Banner inside Drawer */}
        {!isOnline && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-800 flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Mất kết nối Internet: Trợ lý AI trực tuyến tạm dừng. Hệ thống vẫn lưu lịch sử học tập trên máy của em!</span>
          </div>
        )}

        {/* Chat message list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.sender === 'ai' && (
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      {msg.source === 'gemini-3.8-flash' && <Sparkles className="w-2.5 h-2.5 text-blue-600" />}
                      {msg.source === 'gemini-3.8-flash' ? 'Trí tuệ nhân tạo Gemini' : 'Bộ tri thức KHTN tích hợp'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSpeak(msg.text)}
                      className="hover:text-blue-600 flex items-center gap-0.5 text-slate-500"
                      title="Đọc to câu trả lời"
                    >
                      <Volume2 className="w-3 h-3" /> Nghe
                    </button>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-2xl w-fit text-xs text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              Thầy/Cô AI đang suy nghĩ câu trả lời cho em...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-white border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-blue-500" /> Gợi ý câu hỏi nhanh:
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="text-[11px] whitespace-nowrap bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-1.5 rounded-lg transition-colors font-medium flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi KHTN 6 của em..."
              disabled={isLoading}
              className="flex-1 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl shadow-xs transition-all flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-slate-400 text-center mt-1.5">
            Phòng thí nghiệm KHTN 6 – Trường TH&THCS Hà Tiên
          </p>
        </div>
      </div>
    </div>
  );
};
