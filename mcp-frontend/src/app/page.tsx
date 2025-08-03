'use client';

import { useState } from 'react';
import ChatInput from '@/components/ChatInput';
import ChatHistory from '@/components/ChatHistory';
import SendEmailForm from '@/components/SendEmailForm';

export default function Home() {
  const [history, setHistory] = useState<{ question: string; answer: string }[]>([]);

  const handleSend = async (question: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    const answer = data.answer;

    setHistory(prev => [...prev, { question, answer }]);
  };

  return (
    <main className="max-w-2xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Resume Chatbot</h1>
      <SendEmailForm />
      <ChatInput onSend={handleSend} />
      <ChatHistory history={history} />
    </main>
  );
}
