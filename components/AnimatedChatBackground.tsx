"use client";

import { useEffect, useRef, useState } from "react";

const MESSAGES = [
    "Oi! Como posso te ajudar hoje?",
    "Tem alguma dúvida sobre o projeto?",
    "A autenticação é super rápida!",
    "Fique à vontade para testar nossos recursos.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Você já viu a nova funcionalidade?",
    "Estamos aqui para ajudar!",
    "Qualquer dúvida, é só perguntar.",
    "The first rule of the fight club is: you do not talk about the fight club.",
    "The second rule of the fight club is: you do not talk about the fight club.",
];

const getRandomMessage = () => {
  const index = Math.floor(Math.random() * MESSAGES.length);
  return MESSAGES[index];
};

type Message = {
  id: number;
  text: string;
};

const AnimatedChatBackground = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastId, setLastId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage: Message = {
        id: ++idRef.current,
        text: getRandomMessage(),
      };
      setMessages((prev) => [newMessage, ...prev.slice(0, 8)]);
      setLastId(newMessage.id);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 flex flex-col h-full w-full p-4">
      <div
        className="flex-1 overflow-y-auto flex flex-col-reverse gap-2 mb-4 scrollbar-thin scrollbar-thumb-zinc-700"
        ref={containerRef}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`w-fit bg-blue-800/60 text-white px-4 py-2 rounded-xl ${
              msg.id === lastId ? "animate-fade-in" : ""
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          disabled
          className="flex-1 rounded-full bg-zinc-800/40 px-4 py-2 text-white placeholder:text-zinc-400"
          placeholder="Digite sua mensagem..."
        />
        <button
          disabled
          className="bg-blue-600 px-4 py-2 rounded-full text-white opacity-70 cursor-not-allowed"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default AnimatedChatBackground;