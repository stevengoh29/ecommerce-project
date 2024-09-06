import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

export type DecodedToken = {
    userId: string
    userRole: 'SELLER' | 'ADMIN'
    storeId?: string
    iat: number
    exp: number
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")

    if (accessToken === undefined) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const decodedToken: DecodedToken = jwtDecode(accessToken.value)

    console.log(decodedToken)

    const isSeller = decodedToken.userRole === 'SELLER';
    const isAdmin = decodedToken.userRole === 'ADMIN';
    const pathName = request.nextUrl.pathname

    if (pathName === '/') {
        if (isAdmin) return NextResponse.redirect(new URL('/admin/users', request.url))

        // Seller
        if (!decodedToken.storeId && isSeller) return NextResponse.redirect(new URL('/seller/register-store', request.url))
        return NextResponse.redirect(new URL('/seller', request.url))
    }

    if (isSeller) {
        if (pathName == '/seller/register-store' && decodedToken.storeId) return NextResponse.redirect(new URL('/seller', request.url))
        if (!decodedToken.storeId && pathName != '/seller/register-store') return NextResponse.redirect(new URL('/seller/register-store', request.url))
    }

    if (pathName.includes('/admin') && decodedToken.userRole == 'SELLER') {
        return NextResponse.redirect(new URL('/forbidden', request.url))
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!login|register|_next/static|_next/image|favicon.ico).*)',]
}