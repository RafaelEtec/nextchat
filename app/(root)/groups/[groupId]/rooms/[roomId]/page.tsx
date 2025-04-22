"use client";

import { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js';
import config from "@/lib/config";
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

export default function ChatPage() {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: session } = useSession();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = async () => {
      const res = await fetch(`/api/messages?roomId=${roomId}`);
      const data = await res.json();
      setMessages(data.messages);
    };
    loadMessages();

    const pusher = new Pusher(config.env.pusher.key, {
      cluster: config.env.pusher.cluster,
    });

    const channel = pusher.subscribe(`room-${roomId}`);
    channel.bind('new-message', (data: any) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      pusher.unsubscribe(`room-${roomId}`);
      pusher.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: message,
          roomId,
          userId: session?.user?.id,
        }),
      });

      setMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <div className="flex flex-col h-full w-full font-roboto">
      <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col space-y-2">
        {messages.map((msg, i) => {
          const isOwn = msg.user?.id === session?.user?.id;
          return (
            <div
              key={i}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs break-words bg-zinc-800 text-white p-3 rounded-xl ${isOwn ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                <div className="flex items-center mb-1 space-x-2">
                  {msg.user?.image && (
                    <img
                      src={msg.user.image}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium text-my-blue">
                    {msg.user?.name ?? 'Anônimo'}
                  </span>
                </div>
                <div className="text-sm">{msg.content}</div>
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full p-4 flex items-center gap-2 border-t border-zinc-700 bg-zinc-900"
      >
        <input
          type="text"
          className="flex-grow p-2 pl-4 rounded-full bg-zinc-800 text-white outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button
          type="submit"
          className="rounded-full text-white cursor-pointer"
        >
          <img src="/icons/enviar.svg" alt="enviar" width={40} height={40} />
        </button>
      </form>
    </div>
  );
}