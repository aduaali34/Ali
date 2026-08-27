import ToastProvider from '@/components/ToastProvider'
import DarkModeToggle from '@/components/DarkModeToggle'
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
        <ToastProvider>
          <Header />
          <div className="container mx-auto p-4 flex justify-end">
            <DarkModeToggle />
          </div>
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
