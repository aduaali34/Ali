import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Event from '@/models/Event'
import { getToken } from 'next-auth/jwt'
import User from '@/models/User'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })

    const userId = token.sub
    const { id } = params
    const event = await Event.findById(id)
    if (!event) return NextResponse.json({ error: 'event not found' }, { status: 404 })

    // check capacity
    if (event.capacity && event.attendees.length >= event.capacity) {
      return NextResponse.json({ error: 'event full' }, { status: 400 })
    }

    // prevent duplicate
    if (event.attendees.map(a => String(a)).includes(String(userId))) {
      return NextResponse.json({ error: 'already registered' }, { status: 400 })
    }

    event.attendees.push(userId)
    await event.save()

    // optional: send confirmation email here

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}
