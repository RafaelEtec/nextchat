interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    createdAt: string;
}

interface Group {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string;
}

interface Room {
    id: string;
    name: string;
    description: string;
    access: string;
    groupId: string;
    createdAt: string;
    updatedAt: string;
}

interface Message {
    id: string;
    content: string;
    createdAt: string;
    user?: {
      id: string;
      name: string;
      image: string;
    };
}

interface MessageBubbleProps {
    msg: Message;
    currentUserId: string;
}

interface Solicitacao {
    userId: string;
    friendId: string;
    status: string;
    user: User;
}

interface InviteByEmailParams {
    email: string;
    userId: string;
    friendId: string;
}

interface CreateGroupParams {
    name: string;
    description: string;
    thumbnail: string;
    creatorId: string
}