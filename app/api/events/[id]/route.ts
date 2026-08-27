import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Event from '@/models/Event'
import { getToken } from 'next-auth/jwt'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  const { id } = params
  const event = await Event.findById(id).lean()
  if (!event) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(event)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token || token.role !== 'admin') return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const { id } = params
    const body = await req.json()
    const event = await Event.findByIdAndUpdate(id, body, { new: true })
    if (!event) return NextResponse.json({ error: 'not found' }, { status: 404 })
    return NextResponse.json({ ok: true, event })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token || token.role !== 'admin') return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const { id } = params
    await Event.findByIdAndDelete(id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}
