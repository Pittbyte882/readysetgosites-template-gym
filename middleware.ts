import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.ADMIN_SECRET!)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect all /admin routes except the login page
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = req.cookies.get('ig-admin-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    try {
      const { payload } = await jwtVerify(token, SECRET)
      if (payload.role !== 'admin') throw new Error('Not admin')
    } catch {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}