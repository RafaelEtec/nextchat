const config = {
    env: {
        github: {
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        },
        next: {
            authSecret: process.env.AUTH_SECRET!,
        },
    },
};

export default config;