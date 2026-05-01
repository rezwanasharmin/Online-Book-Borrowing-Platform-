import { NextResponse } from 'next/server';
import booksData from '@/data/books.json';

export async function GET() {
  return NextResponse.json(booksData);
}

export async function POST(request) {
  return NextResponse.json({ error: 'POST not supported for books in this demo' }, { status: 405 });
}