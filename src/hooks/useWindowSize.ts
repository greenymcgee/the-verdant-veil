import { useCallback, useEffect, useState } from 'react'

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ height: 0, width: 0 })

  const runSetWindowSize = useCallback(() => {
    setWindowSize({ height: window.innerHeight, width: window.innerWidth })
  }, [])

  useEffect(() => {
    runSetWindowSize()
    window.addEventListener('resize', runSetWindowSize)
    return () => {
      window.removeEventListener('resize', runSetWindowSize)
    }
  }, [runSetWindowSize])

  return windowSize
}
