'use client'
import React, { useCallback, useEffect, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

interface Props {
  game: Game
}

export function GameCreateToaster({ game }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { push } = useRouter()
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const runOneTime = useCallback((callback: VoidFunction) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(callback, 10)
  }, [])

  useEffect(() => {
    if (!searchParams.get('created')) return

    runOneTime(() => {
      toast.success(`${game.name} has been created!`)
      push(pathname)
    })
  }, [game.name, runOneTime, pathname, push, searchParams])

  return <></>
}
