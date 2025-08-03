export default function ChatHistory({ history }: {
  history: { question: string; answer: string }[];
}) {
  return (
    <div className="mt-6 space-y-6">
      {history.map((item, idx) => (
        <div
          key={idx}
          className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="mb-2">
            <span className="font-semibold text-blue-600">You:</span>
            <p className="text-gray-800 ml-2 mt-1">{item.question}</p>
          </div>
          <div>
            <span className="font-semibold text-green-600">Assistant:</span>
            <p className="text-gray-700 ml-2 mt-1">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

