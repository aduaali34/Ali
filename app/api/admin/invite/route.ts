import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import dbConnect from '@/lib/dbConnect'
import InviteToken from '@/models/InviteToken'
import User from '@/models/User'
import { sendInviteEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(req: Request) {
  const body = await req.json()
  const { email } = body
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })

  // Authenticate and authorize
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token || token.role !== 'admin') return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  await dbConnect()

  // Enforce admin limit
  const MAX_ADMINS = Number(process.env.MAX_ADMINS || 3)
  const currentAdmins = await User.countDocuments({ role: 'admin' })
  if (currentAdmins >= MAX_ADMINS) {
    return NextResponse.json({ error: 'admin limit reached' }, { status: 400 })
  }

  // Create invite token
  const inviteToken = crypto.randomBytes(24).toString('hex')
  const invite = await InviteToken.create({ email, token: inviteToken, role: 'admin', createdBy: token.sub })

  // Send invite email (may log if mail not configured)
  await sendInviteEmail(email, inviteToken)

  return NextResponse.json({ ok: true, inviteId: invite._id })
}
