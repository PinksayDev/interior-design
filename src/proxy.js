import { NextResponse } from "next/server";

// Optimistic check only: sends visitors without a session cookie straight to the login page.
// Real verification happens in requireAdmin() on every admin page and Server Action.
export function proxy(request) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login" || pathname === "/admin/register") return NextResponse.next();
  if (!request.cookies.has("admin_session")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
