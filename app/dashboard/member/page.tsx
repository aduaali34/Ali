import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import { getToken } from 'next-auth/jwt'

export default async function MemberDashboard(){
  const token = await getToken({ req: undefined as any, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p className="mt-2">Please sign in to access your dashboard.</p>
      </div>
    )
  }

  await dbConnect()
  const user = await User.findById(token.sub)

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Member Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome back, {user?.firstName || user?.email}</p>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-white/60 rounded shadow">
          <h2 className="font-semibold">Upcoming Events</h2>
          <p className="text-sm text-gray-600">View and register for events.</p>
        </div>
        <div className="p-4 bg-white/60 rounded shadow">
          <h2 className="font-semibold">Resources</h2>
          <p className="text-sm text-gray-600">Download resources available to members.</p>
        </div>
      </div>
    </section>
  )
}
