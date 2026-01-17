'use client'
import { useCallback, useEffect, useState } from 'react'

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ height: 0, width: 0 })

  const runSetWindowSize = useCallback(() => {
    setWindowSize({ height: window.innerHeight, width: window.innerWidth })
  }, [])

  useEffect(() => {
    // This seems like the simplest way to ensure the window size is set
    // client-side, but will not break server-side
    // eslint-disable-next-line react-hooks/set-state-in-effect
    runSetWindowSize()
    window.addEventListener('resize', runSetWindowSize)
    return () => {
      window.removeEventListener('resize', runSetWindowSize)
    }
  }, [runSetWindowSize])

  return windowSize
}
