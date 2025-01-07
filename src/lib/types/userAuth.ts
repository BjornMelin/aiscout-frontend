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

// Social media links
export interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

// User data stored in the auth system
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  profileImage?: string; // URL to uploaded profile photo
  avatarSeed?: string; // Seed for generating avatar
  role?: string;
  affiliation?: string;
  bio?: string;
  socialLinks?: SocialLinks;
}

// User profile information
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  profileImage?: string; // URL to uploaded profile photo
  avatarSeed?: string; // Seed for generating avatar
  affiliation?: string;
  role?: string;
  interests: string[];
  bio?: string;
  socialLinks?: SocialLinks;
  createdAt: Date;
  updatedAt: Date;
}

// Profile form data
export interface ProfileFormData {
  name: string;
  affiliation?: string;
  role?: string;
  interests: string[];
  bio?: string;
  profileImage?: File;
  avatarSeed?: string;
  socialLinks?: SocialLinks;
}

// Reset password data
export interface ResetPasswordData {
  token: string;
  password: string;
}

// Helper function to get user's display image
export function getUserDisplayImage(user: AuthUser | UserProfile): string {
  if (user.profileImage) {
    return user.profileImage;
  }
  return user.avatarSeed
    ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}`
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${
        user.name || user.email
      }`;
}

// Extend next-auth session type
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      profileImage?: string;
      avatarSeed?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
    avatarSeed?: string;
  }
}
