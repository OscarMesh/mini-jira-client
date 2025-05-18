import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Get the token using next-auth/jwt instead of the full session
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  });

  const isAuthenticated = !!token;

  // Auth routes protection
  if (path.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/auth/login", request.url);
      // Preserve the original URL to redirect back after login
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Prevent authenticated users from accessing login page
  if (path.startsWith("/auth/login")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Add routes that need authentication
    "/dashboard/:path*",
    // Add auth routes that should redirect if already authenticated
    "/auth/login",
  ],
};
