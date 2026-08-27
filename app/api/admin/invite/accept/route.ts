import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import InviteToken from '@/models/InviteToken'
import User from '@/models/User'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  const body = await req.json()
  const { token, password, firstName, lastName } = body
  if (!token || !password) return NextResponse.json({ error: 'token and password are required' }, { status: 400 })

  await dbConnect()

  const invite = await InviteToken.findOne({ token })
  if (!invite) return NextResponse.json({ error: 'invalid or expired token' }, { status: 400 })
  if (invite.used) return NextResponse.json({ error: 'token already used' }, { status: 400 })
  if (invite.expiresAt && invite.expiresAt < new Date()) return NextResponse.json({ error: 'token expired' }, { status: 400 })

  // Enforce admin limit at accept time
  const MAX_ADMINS = Number(process.env.MAX_ADMINS || 3)
  const currentAdmins = await User.countDocuments({ role: 'admin' })
  if (currentAdmins >= MAX_ADMINS) {
    return NextResponse.json({ error: 'admin limit reached' }, { status: 400 })
  }

  // Create the user with admin role
  const existing = await User.findOne({ email: invite.email })
  if (existing) {
    return NextResponse.json({ error: 'user already exists' }, { status: 400 })
  }

  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({ email: invite.email, passwordHash: hash, firstName, lastName, role: 'admin', isEmailVerified: true })

  invite.used = true
  await invite.save()

  return NextResponse.json({ ok: true, userId: user._id })
}
