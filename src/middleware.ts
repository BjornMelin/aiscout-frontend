import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

// Paths that are always accessible
const publicPaths = new Set([
  "/sign-in",
  "/sign-up",
  "/reset-password",
  "/api/public",
  "/api/health",
]);

// Paths that require rate limiting
const rateLimitedPaths = new Set([
  "/api/auth/register",
  "/api/auth/login",
  "/api/auth/reset-password",
]);

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const ip = request.ip ?? "127.0.0.1";

  // Check rate limiting for specific paths
  if (rateLimitedPaths.has(pathname)) {
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_${ip}`
    );

    if (!success) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests",
          limit,
          reset,
          remaining,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }
  }

  // Allow public paths
  if (publicPaths.has(pathname)) {
    return NextResponse.next();
  }

  // Check for auth token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Handle API routes
  if (pathname.startsWith("/api/")) {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: "Authentication required" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    return NextResponse.next();
  }

  // Handle protected pages
  if (!token) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Configure which routes to protect
export const config = {
  matcher: [
    "/user/:path*",
    "/api/user/:path*",
    "/api/content/:path*",
    "/content/:path*/edit",
    "/api/auth/:path*",
  ],
};
