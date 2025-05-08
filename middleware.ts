import { NextRequest, NextResponse } from "next/server";

const publicOnlyUrls: Record<string, boolean> = {
  "/log-in": true,
  "/sms": true,
  "/create-account": true,
};

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("delicious-carrot");
  const isLoggedIn = sessionCookie !== undefined;

  const pathname = request.nextUrl.pathname;
  const isPublic = publicOnlyUrls[pathname];

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }

  if (isLoggedIn && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
