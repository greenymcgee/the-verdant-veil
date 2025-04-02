'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

import { Heading } from '@/components'

export function GamesHeader() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')

  return (
    <Heading
      className="mb-3 bg-neutral-900 font-serif text-white"
      classNameOverrides={{ color: 'text-neutral-900' }}
    >
      {query ? `Results for "${query}"` : 'Games'}
    </Heading>
  )
}
