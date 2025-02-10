import React from 'react'

import { Card, Searchbar } from '@/components'

import { Games } from './components'
import { NewGameModal } from './components/newGameModal'

export default function AdminGamesPage() {
  return (
    <Card>
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-neutral-800" data-testid="main-heading">
          Games
        </h1>
        <NewGameModal />
      </header>
      <Searchbar className="mb-1 max-w-60" />
      <Games />
    </Card>
  )
}
