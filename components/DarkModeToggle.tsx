'use client'
import { useEffect, useState } from 'react'

export default function DarkModeToggle(){
  const [isDark, setIsDark] = useState(false)
  useEffect(()=>{
    const saved = localStorage.getItem('isDark')
    if (saved) setIsDark(saved === 'true')
    else setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
  },[])

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('isDark', String(isDark))
  },[isDark])

  return (
    <button onClick={()=>setIsDark(!isDark)} className="px-3 py-1 border rounded">
      {isDark ? 'Light' : 'Dark'}
    </button>
  )
}
