import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Event from '@/models/Event'
import { getToken } from 'next-auth/jwt'
import { requireAdmin } from '@/lib/auth'

export async function GET(req: Request) {
  await dbConnect()
  const events = await Event.find({}).sort({ startDate: 1 }).lean()
  return NextResponse.json(events)
}

export async function POST(req: Request) {
  try {
    await dbConnect()
    // authorize admin
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token || token.role !== 'admin') return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const body = await req.json()
    const { title, description, startDate, endDate, location, capacity } = body
    if (!title || !startDate) return NextResponse.json({ error: 'title and startDate required' }, { status: 400 })

    const event = await Event.create({ title, description, startDate, endDate, location, capacity, createdBy: token.sub })
    return NextResponse.json({ ok: true, event })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}
