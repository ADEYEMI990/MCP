import express from 'express';
import cors from 'cors';
import { chatWithResume } from './chatService';
import { sendEmail } from './emailService';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('✅ MCP Server is running. Use /api/chat or /api/send-email endpoints.');
});

app.post('/api/chat', async (req, res) => {
  try {
    const { question } = req.body;
    const answer = await chatWithResume(question);
    res.json({ answer });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    const messageId = await sendEmail(to, subject, body);
    res.json({ success: true, messageId });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`MCP server running at http://localhost:${PORT}`));
