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
  // If authenticated user tries to navigate to login page, they will be redirected to home page
  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(request.nextUrl.origin)
  }
}

