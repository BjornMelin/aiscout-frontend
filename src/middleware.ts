import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Paths that are always accessible
const publicPaths = new Set([
  "/sign-in",
  "/sign-up",
  "/reset-password",
  "/api/public",
  "/api/health",
  "/api/trending", // Add trending endpoint to public paths
]);

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

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
