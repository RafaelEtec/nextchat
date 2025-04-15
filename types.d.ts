interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    createdAt: string;
}

interface InviteByEmailParams {
    email: string;
    userId: string;
    friendId: string;
}