import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "@/app/constants/users";
import prisma from "@/db";
import { GoogleUser } from "@/types";

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
        async session({ session }) {
            const { email, name, image } = session.user as GoogleUser;
            const isUser = await prisma.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (!isUser) {
                console.log(
                    `User ${email} does not exist, creating user and logging in`
                );
                await prisma.user.create({
                    data: {
                        name: name,
                        email: email,
                        profile: image,
                    },
                });
            } else {
                console.log(`User ${email} exists, logging in`);
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
