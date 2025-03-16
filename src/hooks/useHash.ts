'use client'
import { useEffect, useState } from 'react'

export function useHash() {
  const [hash, setHash] = useState('')

  useEffect(() => {
    function handleHashChange() {
      setHash(window.location.hash)
    }
    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return hash
}
