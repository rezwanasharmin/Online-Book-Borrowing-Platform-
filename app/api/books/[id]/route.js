import { NextResponse } from 'next/server';
import booksData from '@/data/books.json';

export async function GET(request, context) {
  const { params } = context;
  const resolvedParams = await params;
  const book = booksData.find((item) => item.id === resolvedParams?.id);

  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }

  return NextResponse.json(book);
}

export async function PUT(request, context) {
  const { params } = context;
  await params;
  return NextResponse.json({ error: 'Book update not supported' }, { status: 405 });
}
