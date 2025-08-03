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
    <main className="max-w-5xl mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Resume Chatbot</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side: Email form */}
        <div className="md:w-1/2 w-full">
          <SendEmailForm />
        </div>

        {/* Right side: Chat components */}
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <ChatInput onSend={handleSend} />
          <ChatHistory history={history} />
        </div>
      </div>
    </main>
  );

}
