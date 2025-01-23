import React from 'react'

import { Card, LinkTo, Searchbar } from '@/components'
import { ROUTES } from '@/constants'

import { Games } from './components'

export default function AdminGamesPage() {
  return (
    <Card>
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-neutral-800" data-testid="main-heading">
          Games
        </h1>
        <LinkTo
          data-testid="new-game-link"
          href={ROUTES.adminNewGame}
          rightIcon="plus-thick"
          size="sm"
          variant="solid"
        >
          New
        </LinkTo>
      </header>
      <Searchbar className="mb-1 max-w-60" />
      <Games />
    </Card>
  )
}
