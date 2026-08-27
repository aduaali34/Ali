import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export default function ToastProvider({ children }: { children: ReactNode }){
  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  )
}
