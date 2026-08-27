import Link from 'next/link'

export default function Header(){
  return (
    <header className="bg-white/50 backdrop-blur sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold">ISN</Link>
        <nav className="space-x-4 hidden md:block">
          <Link href="/events" className="hover:underline">Events</Link>
          <Link href="/resources" className="hover:underline">Resources</Link>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <Link href="/about" className="hover:underline">About</Link>
        </nav>
        <div className="space-x-2">
          <Link href="/login" className="px-3 py-1 border rounded">Sign in</Link>
          <Link href="/register" className="px-3 py-1 bg-blue-600 text-white rounded">Get started</Link>
        </div>
      </div>
    </header>
  )
}
