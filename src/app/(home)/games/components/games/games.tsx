import React from 'react'

import { GameCard } from '@/components'

import { EmptyGamesCard } from '../emptyGamesCard'

interface Props {
  games: GameWithLimitedResources[]
  isValidating: boolean
  query: string | undefined
}

export function Games({ games, isValidating, query }: Props) {
  if (!games.length) return <EmptyGamesCard query={query} />

  return (
    <ul
      className="relative space-y-6 overflow-y-auto lg:max-h-[calc(100vh-17rem)]"
      data-testid="games"
    >
      {games.map((game) => (
        <GameCard as="li" game={game} key={game.id} validating={isValidating} />
      ))}
    </ul>
  )
}
