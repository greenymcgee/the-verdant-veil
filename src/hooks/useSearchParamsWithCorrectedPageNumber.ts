'use client'

import { useSearchParams } from 'next/navigation'

/**
 * React pagination libraries tend to start with 0, while Ruby libraries start
 * with 1. This is a very annoying problem, but this hook should solve it.
 */
export function useSearchParamsWithCorrectedPageNumber() {
  const searchParams = useSearchParams()
  if (!searchParams.has('page')) return searchParams

  const correctedParams = new URLSearchParams(searchParams)
  correctedParams.set('page', String(Number(searchParams.get('page')) + 1))
  return correctedParams
}
