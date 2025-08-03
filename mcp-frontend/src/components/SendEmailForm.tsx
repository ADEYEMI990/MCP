'use client';
import { useState } from 'react';

export default function SendEmailForm() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('https://mcp-jeql.onrender.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, body }),
      });

      const data = await res.json();
      if (data.success) {
        setResult(`✅ Email sent! ID: ${data.messageId}`);
      } else {
        setResult(`❌ Failed: ${data.error}`);
      }
    } catch (err) {
      setResult('❌ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md max-w-md">
      <h2 className="text-lg font-semibold">Send Email</h2>

      <input
        type="email"
        placeholder="Recipient Email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        className="w-full p-2 border rounded h-32"
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Sending...' : 'Send Email'}
      </button>

      {result && (
        <div>
          <p className="text-sm text-gray-600">
           <strong className="text-gray-800">Preview:</strong> If you are using{" "}
           your email won’t go to a real inbox. You can view it only via the preview link below.
          </p>
          <div className="mt-2 text-sm text-green-600 break-words space-y-1">
          <p>{result.split('ID:')[0].trim()} ID:</p>
          <a
            href={result.split('ID:')[1]?.trim()}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700 break-all"
          >
            {result.split('ID:')[1]?.trim()}
          </a>
          </div>
        </div>
  )
        
      }
    </form>
  );
}