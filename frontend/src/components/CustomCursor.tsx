import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 4 + 'px'
        cursorRef.current.style.top = e.clientY - 4 + 'px'
      }
      if (followerRef.current) {
        followerRef.current.style.left = e.clientX - 16 + 'px'
        followerRef.current.style.top = e.clientY - 16 + 'px'
      }
    }

    const enter = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(2.5)'
      if (followerRef.current) followerRef.current.style.transform = 'scale(1.5)'
    }
    const leave = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(1)'
      if (followerRef.current) followerRef.current.style.transform = 'scale(1)'
    }

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      document.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={followerRef} className="cursor-follower hidden md:block" />
    </>
  )
}
