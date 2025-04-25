import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';
import { auth } from '@/auth';
import config from "@/lib/config";

const pusher = new Pusher({
  appId: config.env.pusher.appId,
  key: config.env.pusher.key,
  secret: config.env.pusher.secret,
  cluster: config.env.pusher.cluster,
  useTLS: true,
})

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { roomId } = await req.json();

  await pusher.trigger(`room-${roomId}`, 'typing', {
    user: {
      name: session.user.name,
      id: session.user.id,
    },
  });

  return NextResponse.json({ success: true });
}