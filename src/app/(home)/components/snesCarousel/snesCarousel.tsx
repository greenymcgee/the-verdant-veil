'use client'
import React from 'react'

import { GameCarousel } from '@/components'
import { ROUTES } from '@/constants'
import { useGetHomeCarouselQuery } from '@/hooks/api'

export function SNESCarousel() {
  const { games, isLoading, isValidating } = useGetHomeCarouselQuery('snes')

  return (
    <div className="container mb-18">
      <GameCarousel
        allResultsLink={ROUTES.platform('snes')}
        games={games}
        loading={isLoading}
        title="SNES"
        validating={isValidating}
      />
    </div>
  )
}
