import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  return NextResponse.json({ message: 'Auth endpoint not configured' }, { status: 404 });
}

export async function POST(request, { params }) {
  const action = params.all ? params.all[0] : null;
  if (action === 'sign-in') {
    return NextResponse.json({ message: 'Use local login form instead' }, { status: 400 });
  }
  return NextResponse.json({ message: 'Auth endpoint not configured' }, { status: 404 });
}

export async function PUT(request, { params }) {
  return NextResponse.json({ message: 'Method not supported' }, { status: 405 });
}

export async function DELETE(request, { params }) {
  return NextResponse.json({ message: 'Method not supported' }, { status: 405 });
}
