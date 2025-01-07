import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import type { AuthUser } from "@/lib/types/userAuth";
import { DefaultUser } from "next-auth";

// Use types from userAuth.ts
declare module "next-auth" {
  interface User extends DefaultUser, Omit<AuthUser, "password" | "createdAt" | "updatedAt"> {}
  interface JWT extends Omit<AuthUser, "password" | "createdAt" | "updatedAt"> {
    accessToken?: string;
    userId: string;
  }
}

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // TODO: Implement user verification with your database
        // This is where you'd verify the user's credentials

        return {
          id: "user_id",
          email: credentials.email,
          name: "User Name",
          avatarSeed: credentials.email, // Use email as avatar seed by default
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          profileImage: profile.picture,
          avatarSeed: profile.email,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          profileImage: profile.avatar_url,
          avatarSeed: profile.login,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          userId: user.id,
          profileImage: user.profileImage,
          avatarSeed: user.avatarSeed,
          role: user.role,
          affiliation: user.affiliation,
          socialLinks: user.socialLinks,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.userId,
          profileImage: token.profileImage,
          avatarSeed: token.avatarSeed,
          role: token.role,
          affiliation: token.affiliation,
          socialLinks: token.socialLinks,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
