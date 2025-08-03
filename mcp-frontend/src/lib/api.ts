export async function fetchChatResponse(question: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  return res.json();
}