import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import VerificationToken from '@/models/VerificationToken'
import PasswordResetToken from '@/models/PasswordResetToken'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { sendVerificationEmail, sendPasswordResetEmail } from '@/lib/email'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const data = await req.json()
  const { email, password, firstName, lastName } = data
  if (!email || !password) return NextResponse.json({ error: 'email and password required' }, { status: 400 })

  await dbConnect()
  const existing = await User.findOne({ email })
  if (existing) return NextResponse.json({ error: 'user exists' }, { status: 400 })

  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({ email, passwordHash: hash, firstName, lastName, role: 'pending', isEmailVerified: false })

  // create verification token
  const token = crypto.randomBytes(20).toString('hex')
  await VerificationToken.create({ token, userEmail: email })
  await sendVerificationEmail(email, token)

  return NextResponse.json({ ok: true })
}
