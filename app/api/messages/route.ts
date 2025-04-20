import { db } from '@/database/drizzle';
import { messages, users } from '@/database/schema';
import { eq, asc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const roomId = searchParams.get('roomId')

  if (!roomId) {
    return NextResponse.json({ error: 'roomId is required' }, { status: 400 })
  }

  const result = await db
  .select({
    id: messages.id,
    content: messages.content,
    createdAt: messages.createdAt,
    user: {
      id: users.id,
      name: users.name,
      image: users.image,
    }
  })
  .from(messages)
  .leftJoin(users, eq(messages.userId, users.id))
  .where(eq(messages.roomId, roomId))
  .orderBy(asc(messages.createdAt));

  return NextResponse.json({ messages: result })
}