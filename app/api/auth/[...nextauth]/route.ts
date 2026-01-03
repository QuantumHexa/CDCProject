import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const conn = await connectToDatabase();
                    if (conn) {
                        const user = await User.findOne({ email: credentials.email });
                        if (user && user.password === credentials.password) {
                            return { id: user._id.toString(), email: user.email, role: user.role };
                        }
                    }
                } catch (e) {
                    console.log("DB Auth failed (Demo Mode active):", e);
                }

                // Also allow a hardcoded fallback if no user exists yet
                // Fallback removed for production
                return null;

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_dev_only",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
