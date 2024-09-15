import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        position: true,
        level: true,
        created_at: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, username, position, password, level } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        username,
        position,
        password: hashedPassword,
        level,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}

// Add similar functions for PUT and DELETE