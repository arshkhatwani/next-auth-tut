import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "@/app/constants/users";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         email: {
        //             label: "Email",
        //             type: "text",
        //             placeholder: "Enter your email",
        //         },
        //         password: { label: "Password", type: "password" },
        //     },
        //     async authorize(credentials) {
        //         const email = credentials?.email;
        //         const password = credentials?.password;

        //         if (!email || !password) return null;

        //         const user = users.find((e) => e.email === email);
        //         if (user?.password === password)
        //             return { id: user.id, email: user.email, name: user.name };

        //         return null;
        //     },
        // }),
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        async session({ session, user, token }) {
            // This is callback
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
