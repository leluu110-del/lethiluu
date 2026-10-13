import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Built-in educational fallback responses for KHTN 6
const FALLBACK_KNOWLEDGE: Record<string, string> = {
  'te_bao': 'Tế bào là đơn vị cơ bản cấu tạo nên mọi cơ thể sống! Tế bào thực vật có thêm thành tế bào (cellulose) giúp giữ hình dạng cứng cáp và lục lạp chứa chất diệp lục để quang hợp, còn tế bào động vật thì không có hai bộ phận này.',
  'virus': 'Virus có kích thước siêu hiển vi (chỉ từ 20 - 300 nanomet) và CHƯA CÓ cấu tạo tế bào. Chúng chỉ gồm vỏ protein bao bọc lõi acid nucleic. Vì virus sống ký sinh nội bào bắt buộc và không có tế bào, thuốc kháng sinh hoàn toàn vô tác dụng đối với virus! Hãy tiêm vaccine để phòng ngừa nhé!',
  'nam': 'Nấm không phải là thực vật vì nấm không có lục lạp và không tự quang hợp được! Nấm là sinh vật dị dưỡng. Có nấm đơn bào như nấm men (làm bánh mì, nấu bia), nấm mốc sợi và nấm đảm (nấm rơm, nấm hương). Chú ý không ăn nấm lạ có màu sặc sỡ vì có thể chứa độc tố nguy hiểm.',
  'da_dang': 'Đa dạng sinh học biểu hiện ở sự phong phú về loài, nguồn gen và các hệ sinh thái. Ở vùng biển đảo Hà Tiên chúng ta, hệ sinh thái rừng ngập mặn đầm Đông Hồ và rạn san hô đóng vai trò bảo vệ bờ biển, chống bão và là nơi sinh sản của rất nhiều loài thủy hải sản quý!',
};

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'AI Science Lab - KHTN 6 Hà Tiên',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// AI Assistant endpoint for KHTN 6 students
app.post('/api/ai-chat', async (req, res) => {
  try {
    const { question, topic, history } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Thiếu câu hỏi của học sinh.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Offline / No-key intelligent fallback
      const lower = question.toLowerCase();
      let matchedKey = 'te_bao';
      if (lower.includes('virus') || lower.includes('vi rút') || lower.includes('kháng sinh') || lower.includes('tiêm')) matchedKey = 'virus';
      else if (lower.includes('nấm') || lower.includes('mốc') || lower.includes('men')) matchedKey = 'nam';
      else if (lower.includes('đa dạng') || lower.includes('sinh thái') || lower.includes('hà tiên') || lower.includes('rừng')) matchedKey = 'da_dang';

      const reply = `[Chế độ dự phòng KHTN 6]\nChào em! Thầy/cô AI Science Lab xin gợi ý cho em: ${FALLBACK_KNOWLEDGE[matchedKey]}\n\n💡 Gợi ý suy luận cho em: Em hãy thử vào tab "Phòng thí nghiệm" hoặc "Bài học" để tự điều chỉnh các điều kiện và quan sát hình ảnh mô phỏng trực quan nhé!`;

      return res.json({
        reply,
        isGemini: false,
        source: 'built-in-knowledge',
      });
    }

    const ai = new GoogleGenAI();

    const systemInstruction = `Bạn là Trợ lý AI KHTN 6 tại Phòng thí nghiệm KHTN ảo của Trường TH&THCS Hà Tiên (Kiên Giang).
Đối tượng người dùng: Học sinh lớp 6 (11 - 12 tuổi).
Phạm vi kiến thức: 4 chủ đề Khoa học Tự nhiên 6:
1. Cơ thể sinh vật (Cấu tạo tế bào nhân sơ/nhân thực, tế bào thực vật vs động vật, sinh vật đơn bào và đa bào, các cấp tổ chức: Tế bào -> Mô -> Cơ quan -> Hệ cơ quan -> Cơ thể).
2. Virus (Kích thước siêu vi, chưa có cấu tạo tế bào, cấu tạo vỏ protein + lõi di truyền, chu trình nhân lên ký sinh nội bào, phòng bệnh bằng vaccine và 5K, thuốc kháng sinh KHÔNG diệt được virus).
3. Nấm (Đặc điểm dị dưỡng, không có lục lạp, cấu tạo nấm men, nấm mốc, nấm đảm, vai trò làm bánh/lên men/kháng sinh, tác hại gây mốc/nấm độc).
4. Đa dạng sinh học (5 giới sinh vật, vai trò hệ sinh thái đặc biệt gắn liền với thiên nhiên vùng biển, rừng ngập mặn Hà Tiên - Kiên Giang, bảo vệ môi trường).

Quy tắc trả lời:
- Ngôn ngữ: Tiếng Việt trong sáng, gần gũi, xưng hô "Thầy/Cô AI" và gọi học sinh là "em" hoặc "bạn nhỏ".
- Tuyệt đối không dùng thuật ngữ quá hàn lâm đại học. Giải thích ngắn gọn, súc tích (khoảng 3-5 câu), trực quan.
- Phương pháp gợi mở (Socratic): Gợi ý dẫn dắt để học sinh tự suy nghĩ và liên hệ thực tế hoặc thí nghiệm trong lab.
- Nếu học sinh hỏi ngoài phạm vi KHTN, nhẹ nhàng nhắc học sinh quay lại nội dung Khoa học tự nhiên thú vị nhé.`;

    // Format chat context if history is provided
    const userPrompt = topic 
      ? `[Chủ đề: ${topic}]\nCâu hỏi của học sinh: ${question}`
      : `Câu hỏi của học sinh: ${question}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 600,
      },
    });

    const reply = response.text || 'Chào em, câu hỏi của em rất hay! Em hãy xem thêm phần mô phỏng trong phòng thí nghiệm để khám phá nhé!';

    return res.json({
      reply,
      isGemini: true,
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Error in /api/ai-chat:', error);
    return res.json({
      reply: 'Chào em! Hiện tại kết nối đến trợ lý AI trực tuyến gặp gián đoạn tạm thời. Em đừng lo, hãy sử dụng các bài học và phòng thí nghiệm ảo được tích hợp sẵn nhé! 🔬',
      isGemini: false,
      source: 'offline-fallback',
      error: error?.message || 'Server error',
    });
  }
});

// Setup dev server with Vite middlewares, or static serving in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Science Lab server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
