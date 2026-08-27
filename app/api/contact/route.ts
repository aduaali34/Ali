import dbConnect from '@/lib/dbConnect'
import { NextResponse } from 'next/server'

export async function POST(req: Request){
  const data = await req.json()
  await dbConnect()
  // For now, we simply log the message. Admin dashboard will surface messages.
  console.log('Contact message', data)
  return NextResponse.json({ ok: true })
}
