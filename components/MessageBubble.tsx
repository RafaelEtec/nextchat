export const MessageBubble = ({ msg, currentUserId }: MessageBubbleProps) => {
    const isCurrentUser = msg.user?.id === currentUserId;

    return (
        <div
            className={`flex flex-col max-w-xs ${
                isCurrentUser ? 'items-end self-end' : 'items-start self-start'
            }`}
            >
            <div className="flex items-center gap-2 mb-1">
                <img
                src={msg.user?.image || '/default-avatar.png'}
                alt="Avatar"
                className="w-6 h-6 rounded-full"
                />
                <span className="text-xs text-blue-400 font-semibold">
                {msg.user?.name || 'Anônimo'}
                </span>
            </div>
            <div
                className={`px-4 py-2 rounded-xl text-white ${
                isCurrentUser ? 'bg-blue-600' : 'bg-zinc-800'
                }`}
            >
                {msg.content}
            </div>
        </div>
    );
};
