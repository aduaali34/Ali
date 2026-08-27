import dbConnect from '@/lib/dbConnect'
import PasswordResetToken from '@/models/PasswordResetToken'
import User from '@/models/User'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { token, password } = await req.json()
  if (!token || !password) return NextResponse.json({ error: 'token and password required' }, { status: 400 })

  await dbConnect()
  const pr = await PasswordResetToken.findOne({ token })
  if (!pr) return NextResponse.json({ error: 'invalid or expired token' }, { status: 400 })
  if (pr.used) return NextResponse.json({ error: 'token used' }, { status: 400 })
  if (pr.expiresAt && pr.expiresAt < new Date()) return NextResponse.json({ error: 'token expired' }, { status: 400 })

  const user = await User.findOne({ email: pr.userEmail })
  if (!user) return NextResponse.json({ error: 'user not found' }, { status: 400 })

  user.passwordHash = await bcrypt.hash(password, 10)
  await user.save()
  pr.used = true
  await pr.save()

  return NextResponse.json({ ok: true })
}
