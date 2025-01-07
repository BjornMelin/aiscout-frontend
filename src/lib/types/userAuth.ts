import type { DefaultSession } from "next-auth";

// Session information returned by the auth system
export interface Session {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  expires: string;
}

// User data stored in the auth system
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  password?: string; // Made optional to align with user profile
  createdAt?: Date; // Made optional for flexibility
  updatedAt?: Date; // Made optional for flexibility
  image?: string; // Added image field for consistency
}

// User profile information
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

// Profile form data
export interface ProfileFormData {
  name: string;
  affiliation?: string;
  interests: string[];
  bio?: string;
  image?: File;
}

// Reset password data
export interface ResetPasswordData {
  token: string;
  password: string;
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
