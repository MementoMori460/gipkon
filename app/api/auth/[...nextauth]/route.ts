import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Kullanıcı Adı", type: "text", placeholder: "admin" },
                password: { label: "Şifre", type: "password" }
            },
            async authorize(credentials) {
                // Hardcoded for simplicity as requested in plan
                // In a real app, this should match against a database or env vars
                const validUsername = process.env.ADMIN_USERNAME || "admin";
                const validPassword = process.env.ADMIN_PASSWORD || "gipkon2024";

                if (
                    credentials?.username === validUsername &&
                    credentials?.password === validPassword
                ) {
                    return { id: "1", name: "Admin User", email: "admin@gipkon.com.tr" };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/admin/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            return session;
        },
        async jwt({ token, user }) {
            return token;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
