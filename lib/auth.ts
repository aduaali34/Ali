import { getToken } from 'next-auth/jwt'

export async function getServerRole(req: Request) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return null
  // @ts-ignore
  return { sub: token.sub, role: token.role }
}

export async function requireAdmin(req: Request) {
  const t = await getServerRole(req)
  if (!t || t.role !== 'admin') throw new Error('unauthorized')
  return t
}
