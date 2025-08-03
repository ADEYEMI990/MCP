import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { question } = await req.json();
  const res = await fetch('http://localhost:3001/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  const data = await res.json();
  return NextResponse.json(data);
}