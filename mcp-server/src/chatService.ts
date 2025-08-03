import fs from 'fs';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const resume = JSON.parse(fs.readFileSync('resume.json', 'utf-8'));
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function chatWithResume(question: string): Promise<string> {
  const prompt = `You are an assistant that answers questions based on the resume data:\n${JSON.stringify(resume, null, 2)}\n\nQuestion: ${question}\nAnswer:`;

  const completion = await openai.completions.create({
    model: "gpt-4.1",
    prompt,
    max_tokens: 200
  });

  const answer = completion.choices?.[0]?.text?.trim();
  return answer ?? "Sorry, I couldn't generate a response.";
}
