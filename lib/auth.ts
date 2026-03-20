import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(process.env.ADMIN_SECRET!)
const COOKIE = 'ig-admin-token'
const EXPIRY = '8h'

export async function signAdminToken() {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(EXPIRY)
    .setIssuedAt()
    .sign(SECRET)
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload.role === 'admin'
  } catch {
    return false
  }
}

export async function getAdminToken() {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE)?.value ?? null
}

export async function isAdminAuthenticated() {
  const token = await getAdminToken()
  if (!token) return false
  return verifyAdminToken(token)
}

export { COOKIE }