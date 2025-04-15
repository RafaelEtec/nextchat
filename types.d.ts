interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    createdAt: string;
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