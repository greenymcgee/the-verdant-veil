import React from 'react'
import { format, formatDistance } from 'date-fns'
import Image from 'next/image'

import { Heading } from '@/components'

import { BackToAdmin } from '../backToAdmin'

interface Props {
  game: Game
}

export function GameHeader({ game }: Props) {
  const firstReleaseDate = game.firstReleaseDate
    ? new Date(game.firstReleaseDate ?? '')
    : ''

  return (
    <header
      className="mb-4 bg-neutral-900 text-white"
      data-testid="game-header"
    >
      <BackToAdmin slug={game.slug} />
      <Heading
        className="mb-1 font-serif"
        classNameOverrides={{ color: 'text-white' }}
      >
        {game.name}
      </Heading>
      {game.firstReleaseDate ? (
        <p className="text-primary-100 mb-4" data-testid="first-release-date">
          {format(firstReleaseDate, 'M/d/yyyy')} (
          {formatDistance(new Date(), firstReleaseDate)})
        </p>
      ) : null}
      <div className="grid-cols-12 gap-6 sm:grid">
        <Image
          alt={`${game.name} Cover`}
          className="col-span-4 mb-4 max-w-[200px] sm:mb-0 sm:max-w-full"
          height={game.cover.height}
          src={game.cover.url}
          width={game.cover.width}
        />
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="col-span-8 aspect-4/3 h-full w-full sm:aspect-auto"
          referrerPolicy="strict-origin-when-cross-origin"
          src={`https://www.youtube.com/embed/${game.featuredVideoId}`}
          title="YouTube video player"
        />
      </div>
    </header>
  )
}
