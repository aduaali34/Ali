export default function GlobalError({ error }: { error: Error }){
  console.error(error)
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <pre className="mt-4 bg-red-50 p-4 rounded">{error.message}</pre>
    </div>
  )
}
