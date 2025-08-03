import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { question } = await req.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  const data = await res.json();
  return NextResponse.json(data);
}