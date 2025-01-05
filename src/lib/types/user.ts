import type { DefaultSession } from "next-auth";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  affiliation?: string;
  interests: string[];
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileFormData {
  name: string;
  affiliation?: string;
  interests: string[];
  bio?: string;
  image?: File;
}

// Extend next-auth session type
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
  }
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  password?: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}
