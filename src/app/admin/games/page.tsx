import React from 'react'

import { LinkTo, Searchbar } from '@/components'
import { ROUTES } from '@/constants'

import { Games } from './components'

export default function AdminGamesPage() {
  return (
    <>
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-neutral-800">Games</h1>
        <LinkTo data-testid="new-game-link" href={ROUTES.adminNewGame}>
          New
        </LinkTo>
      </header>
      <Searchbar className="mb-1 max-w-60" />
      <Games />
    </>
  )
}
