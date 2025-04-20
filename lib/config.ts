const config = {
    env: {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        github: {
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        },
        google: {
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        },
        next: {
            authSecret: process.env.AUTH_SECRET!,
        },
        imageKit: {
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
        },
        pusher: {
            appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
            key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
            secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        },
        databaseUrl: process.env.DATABASE_URL!,
    },
};

export default config;