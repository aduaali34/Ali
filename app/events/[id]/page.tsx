import dbConnect from '@/lib/dbConnect'
import Event from '@/models/Event'

export default async function EventDetail({ params }: { params: { id: string } }){
  await dbConnect()
  const event = await Event.findById(params.id).lean()
  if (!event) return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Event not found</h1>
    </div>
  )

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="mt-4 text-gray-600">{event.description}</p>
      <p className="mt-2">Location: {event.location}</p>
      <p className="mt-1">Starts: {event.startDate ? new Date(event.startDate).toLocaleString() : ''}</p>
      <p className="mt-1">Ends: {event.endDate ? new Date(event.endDate).toLocaleString() : ''}</p>

      <form className="mt-6" action={"/api/events/" + params.id + "/register"} method="post">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Register for this event</button>
      </form>
    </section>
  )
}
