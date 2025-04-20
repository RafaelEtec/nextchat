import Pusher from 'pusher'
import { NextResponse } from 'next/server'
import config from "@/lib/config";
import { db } from '@/database/drizzle';
import { messages, users } from '@/database/schema';
import { asc, eq } from 'drizzle-orm';

const pusher = new Pusher({
  appId: config.env.pusher.appId,
  key: config.env.pusher.key,
  secret: config.env.pusher.secret,
  cluster: config.env.pusher.cluster,
  useTLS: true,
})

export async function POST(req: Request) {
  const { content, roomId, userId } = await req.json()

  const [msg] = await db
    .insert(messages)
    .values({
      content,
      roomId,
      userId,
    })
    .returning()

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      image: users.image,
    })
    .from(users)
    .where(
      eq(users.id, userId)
    )

  const enrichedMsg = {
    ...msg,
    user: {
      id: user.id,
      name: user.name,
      image: user.image,
    }
  }

  await pusher.trigger(`room-${roomId}`, 'new-message', enrichedMsg)

  return NextResponse.json({ status: 'ok', message: enrichedMsg })
}