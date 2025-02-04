// middleware.ts
import { getUserId } from '@/app/lib/actions';
import apiService from '@/app/services/apiService';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Check if user is authenticated
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Get resume data
    const resume = await apiService.get(`/api/ats/${userId}`);
    if (!resume) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Add data to request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', userId)
    requestHeaders.set('x-resume-data', JSON.stringify(resume))

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    })
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/impact', '/other-protected-routes'],
}