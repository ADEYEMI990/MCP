"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatWithResume = chatWithResume;
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const resume = JSON.parse(fs_1.default.readFileSync('resume.json', 'utf-8'));
async function chatWithResume(question) {
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
    const data = await response.json();
    console.log('🔍 OpenRouter API Raw Response:\n', JSON.stringify(data, null, 2));
    return data.choices?.[0]?.message?.content?.trim() || 'No response';
}
//# sourceMappingURL=chatService.js.map