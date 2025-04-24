'use client'
import React from 'react'

import { GameCarousel } from '@/components'
import { ROUTES } from '@/constants'
import { useGetHomeCarouselQuery } from '@/hooks/api'

export function PS1Carousel() {
  const { games, isLoading, isValidating } = useGetHomeCarouselQuery('ps')

  return (
    <div className="container">
      <GameCarousel
        allResultsLink={ROUTES.platform('ps')}
        games={games}
        loading={isLoading}
        title="PS1"
        validating={isValidating}
      />
    </div>
  )
}
