import '@/styles/globals.css'
import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Intentional Students Network',
  description: 'A community of intentional students',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
