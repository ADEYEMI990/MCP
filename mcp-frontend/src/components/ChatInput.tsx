'use client';

import { useState } from 'react';

export default function ChatInput({ onSend }: { onSend: (question: string) => void }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border rounded p-2"
        placeholder="Ask a question about the resume..."
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded">Send</button>
    </form>
  );
}
