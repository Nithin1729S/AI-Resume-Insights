import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /login
     * 2. /logout
     * 3. /signin
     * 4. / (home)
     * 5. /_next (Next.js internals)
     * 6. /static (static files)
     * 7. /api (API routes)
     * 8. public files like favicon.ico, robots.txt
     */
    '/((?!login|logout|signin|api|_next|static|favicon.ico|robots.txt|$).*)',
  ],
}