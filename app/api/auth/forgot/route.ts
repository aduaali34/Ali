import dbConnect from '@/lib/dbConnect'
import PasswordResetToken from '@/models/PasswordResetToken'
import crypto from 'crypto'
import PasswordResetTokenModel from '@/models/PasswordResetToken'
import User from '@/models/User'
import { sendPasswordResetEmail } from '@/lib/email'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })

  await dbConnect()
  const user = await User.findOne({ email })
  if (!user) return NextResponse.json({ ok: true }) // do not reveal user existence

  const token = crypto.randomBytes(24).toString('hex')
  await PasswordResetToken.create({ token, userEmail: email })
  await sendPasswordResetEmail(email, token)

  return NextResponse.json({ ok: true })
}
