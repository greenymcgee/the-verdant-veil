import { useEffect, useState } from 'react'

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = () =>
      setScrollPosition({ x: window.scrollX, y: window.scrollY })
    updatePosition()
    window.addEventListener('scroll', updatePosition)
    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}
