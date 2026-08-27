import dbConnect from '@/lib/dbConnect'
import { getToken } from 'next-auth/jwt'
import User from '@/models/User'

export default async function AdminDashboard(){
  // simple server-side protection: require admin token
  const token = await getToken({ req: undefined as any, secret: process.env.NEXTAUTH_SECRET })
  if (!token || token.role !== 'admin') {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p className="mt-2">You must be an admin to view this page.</p>
      </div>
    )
  }

  await dbConnect()
  const members = await User.find().limit(10)

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4 text-gray-600">Manage members, events, resources and more.</p>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white/60 rounded shadow">
          <h2 className="font-semibold">Members</h2>
          <p className="text-sm text-gray-600">{members.length} recent users</p>
        </div>
        <div className="p-4 bg-white/60 rounded shadow">
          <h2 className="font-semibold">Events</h2>
          <p className="text-sm text-gray-600">Manage upcoming events</p>
        </div>
        <div className="p-4 bg-white/60 rounded shadow">
          <h2 className="font-semibold">Blog</h2>
          <p className="text-sm text-gray-600">Create and publish posts</p>
        </div>
      </div>
    </section>
  )
}
