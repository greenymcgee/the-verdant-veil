'use client'
import React from 'react'

import { GameCard, Heading, Spinner } from '@/components'
import { useGetHomeCarouselQuery } from '@/hooks/api'

export function CurrentlyPlaying() {
  const { games, isLoading, isValidating } =
    useGetHomeCarouselQuery('currently_playing')
  const [game] = games

  if (isLoading) return <Spinner />

  if (!game) return null

  return (
    <article className="bg-swords mb-18 bg-cover bg-center bg-no-repeat pt-12">
      <div className="container">
        <Heading as="h2" className="mb-3 bg-neutral-900 text-white">
          Currently Playing
        </Heading>
        <div className="items-center gap-4 sm:grid sm:grid-cols-2">
          <GameCard
            className="mb-4 sm:mb-0"
            game={game}
            validating={isValidating}
            variant="carousel"
          />
          <p className="text-secondary-200 text-heading-md font-serif font-bold">
            Across the seas and through the mountains, the endless journey
            continues...
          </p>
        </div>
      </div>
    </article>
  )
}
