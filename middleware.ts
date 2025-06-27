import { NextRequest, NextResponse } from "next/server";

// Only protect dashboard, admin, and employee pages
const protectedRoutes = ["/dashboard", "/admin", "/employee", "/booking"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  // Allow all static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  const isAuthPage =
    pathname.endsWith("/sign-in") || pathname.endsWith("/sign-up");

  // If not authenticated and trying to access a protected route, redirect to sign-in
  if (
    !token &&
    !isAuthPage &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    // Add returnTo param to redirect back after sign-in
    const returnTo = encodeURIComponent(
      pathname + (request.nextUrl.search || "")
    );
    const signInUrl = new URL(
      `/sign-in?returnTo=${returnTo}&reason=booking`,
      request.url
    );
    return NextResponse.redirect(signInUrl);
  }

  // Otherwise, allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
