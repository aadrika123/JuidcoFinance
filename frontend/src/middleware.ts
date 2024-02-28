import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const user = request.cookies.get("loginData")?.value;
  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } 
  // return NextResponse.redirect(new URL(request.url, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|johar.png|Juidco.png|Jhar_logo.png|favicon.ico|auth/login).*)',
  ],
};
