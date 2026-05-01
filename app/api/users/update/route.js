import { NextResponse } from 'next/server';

export async function POST(request) {
  return NextResponse.json({ error: 'User update not supported in this demo' }, { status: 405 });
}
