import dbConnect from '@/lib/dbConnect'
import VerificationToken from '@/models/VerificationToken'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get('token')
  if (!token) return NextResponse.json({ error: 'token required' }, { status: 400 })

  await dbConnect()
  const vt = await VerificationToken.findOne({ token })
  if (!vt) return NextResponse.json({ error: 'invalid or expired token' }, { status: 400 })
  if (vt.used) return NextResponse.json({ error: 'token already used' }, { status: 400 })
  if (vt.expiresAt && vt.expiresAt < new Date()) return NextResponse.json({ error: 'token expired' }, { status: 400 })

  const user = await User.findOne({ email: vt.userEmail })
  if (!user) return NextResponse.json({ error: 'user not found' }, { status: 400 })

  user.isEmailVerified = true
  await user.save()
  vt.used = true
  await vt.save()

  return NextResponse.json({ ok: true })
}
