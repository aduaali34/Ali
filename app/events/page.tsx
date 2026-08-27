import dbConnect from '@/lib/dbConnect'
import Event from '@/models/Event'
import Link from 'next/link'

export default async function EventsPage(){
  await dbConnect()
  const events = await Event.find({}).sort({ startDate: 1 }).lean()

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Events</h1>
      <p className="mt-4 text-gray-600">Upcoming events will be listed here.</p>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {events.map((ev: any) => (
          <article key={ev._id} className="p-4 bg-white/60 rounded shadow">
            <h2 className="text-xl font-semibold">{ev.title}</h2>
            <p className="text-sm text-gray-600">{ev.description}</p>
            <p className="mt-2 text-sm">{ev.location} — {ev.startDate ? new Date(ev.startDate).toLocaleString() : ''}</p>
            <div className="mt-4 flex space-x-2">
              <Link href={`/events/${ev._id}`} className="px-3 py-1 bg-blue-600 text-white rounded">View</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
