import React from 'react';

const messages = [
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
];

const page = async () => {
    return (
        <>
            <div className="flex flex-col h-full w-full font-roboto animate-pulse">
                <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col space-y-2">
                    {messages.map((msg, i) => {
                        return (
                            <div
                                key={i}
                                className={`flex ${messages[i] ? 'justify-end' : 'justify-start'}`}
                            >
                            <div className={`max-w-xs bg-zinc-800 w-40 h-17 p-3 rounded-xl ${messages[i] ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                                <div className="flex items-center mb-1 space-x-2">
                                    <div
                                        className="w-6 h-6 rounded-full bg-google-black"
                                    />
                                    <div className="bg-google-black w-20 h-4"></div>
                                </div>
                                <div className="bg-google-black w-35 h-4"></div>
                            </div>
                            </div>
                        );
                    })}
                </div>
                <div className="w-full p-4 flex items-center gap-2 border-t border-zinc-700 bg-zinc-900">
                    <input disabled
                        type="text"
                        className="flex-grow p-2 pl-4 rounded-full bg-zinc-800 text-white outline-none"
                        placeholder="Digite sua mensagem..."
                    />
                    <button disabled
                        className="rounded-full text-white"
                    >
                        <img src="/icons/enviar.svg" alt="enviar" width={40} height={40} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default page