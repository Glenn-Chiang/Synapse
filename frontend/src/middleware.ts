import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  // If not authenticated, redirect to login page unless already on login page
  if (!token && request.nextUrl.pathname !== '/login') {
    console.log('unauthenticated')
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

