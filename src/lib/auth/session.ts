import { getServerSession } from "next-auth";
import { cache } from "react";
import { authConfig } from "./config";
import type { Session } from "next-auth";
import type { UserProfile } from "@/lib/types/userAuth";
import { getUserDisplayImage } from "@/lib/types/userAuth";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export const getSession = cache(async (): Promise<Session | null> => {
  try {
    return await getServerSession(authConfig);
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
});

export async function getCurrentUser(): Promise<UserProfile | null> {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return null;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${session.user.id}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new AuthError(error.message || "Failed to fetch user profile");
    }

    const profile = await response.json();
    return {
      ...profile,
      displayImage: getUserDisplayImage(profile),
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function requireAuth(): Promise<Session> {
  const session = await getSession();

  if (!session?.user) {
    throw new AuthError("Authentication required");
  }

  return session;
}

export function withAuth<T>(
  handler: (session: Session) => Promise<T>,
  options: { throwError?: boolean } = {}
) {
  return async () => {
    try {
      const session = await requireAuth();
      return await handler(session);
    } catch (error) {
      if (options.throwError) {
        throw error;
      }
      return null;
    }
  };
}

export async function revokeSession(userId: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/revoke`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Failed to revoke session:", error);
    return false;
  }
}
