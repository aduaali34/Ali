export default function HomePage() {
  return (
    <section className="container mx-auto p-6">
      <header className="py-12 text-center">
        <h1 className="text-4xl font-bold">Intentional Students Network</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">A community for purposeful student growth</p>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/60 backdrop-blur rounded-lg shadow">
          <h2 className="text-2xl font-semibold">Mission</h2>
          <p className="mt-2 text-gray-600">To equip students with intentional habits for life and leadership.</p>
        </div>
        <div className="p-6 bg-white/60 backdrop-blur rounded-lg shadow">
          <h2 className="text-2xl font-semibold">Events</h2>
          <p className="mt-2 text-gray-600">Join upcoming gatherings and workshops.</p>
        </div>
        <div className="p-6 bg-white/60 backdrop-blur rounded-lg shadow">
          <h2 className="text-2xl font-semibold">Resources</h2>
          <p className="mt-2 text-gray-600">Find reading lists, guides, and templates.</p>
        </div>
      </section>
    </section>
  )
}
