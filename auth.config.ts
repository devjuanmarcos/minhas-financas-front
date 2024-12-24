import { NextAuthConfig } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

const authConfig: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "John", email: credentials?.email as string };
        if (user) return user;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.supabaseAccessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.supabaseAccessToken = token.supabaseAccessToken as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authConfig;
