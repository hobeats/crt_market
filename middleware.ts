import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/log-in": true,
  "/sms": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("session")?.value;
  const sessionId = cookie ?? null;

  const exists = publicOnlyUrls[request.nextUrl.pathname];
  const isPublicOnly = exists === true;

  if (!sessionId) {
    if (!isPublicOnly) {
      return NextResponse.redirect(new URL("/log-in", request.url));
    }
  } else {
    if (isPublicOnly) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
