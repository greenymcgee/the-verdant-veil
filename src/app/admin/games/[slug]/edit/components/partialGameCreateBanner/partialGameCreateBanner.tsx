'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

import { Banner } from '@/components'

export function PartialGameCreateBanner() {
  const searchParams = useSearchParams()

  if (!searchParams.has('multi-status')) return

  return (
    <Banner
      className="mb-6"
      data-testid="partial-game-create-message"
      message="The game was only partially created!"
    />
  )
}
