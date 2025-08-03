import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const resume = JSON.parse(fs.readFileSync('resume.json', 'utf-8'));

export async function chatWithResume(question: string): Promise<string> {
  const prompt = `You are an assistant answering questions about the following resume:\n${JSON.stringify(resume, null, 2)}\n\nQuestion: ${question}\nAnswer:`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3001', // Replace with your own domain in prod
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert resume assistant.' },
        { role: 'user', content: prompt }
      ]
    })
  });

    const data = await response.json() as {
    choices?: { message?: { content?: string } }[];
    error?: any;
  };
  console.log('🔍 OpenRouter API Raw Response:\n', JSON.stringify(data, null, 2));
  return data.choices?.[0]?.message?.content?.trim() || 'No response';
}

