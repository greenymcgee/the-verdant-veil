import React from 'react'

import { getGames } from '@/actions'
import { Card, Searchbar } from '@/components'

import { AdminErrorCard } from '../components'
import { Games } from './components'
import { NewGameModal } from './components/newGameModal'

export default async function AdminGamesPage() {
  const { error, games, message } = await getGames()

  if (error) return <AdminErrorCard message={message} />

  return (
    <Card>
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-neutral-800" data-testid="main-heading">
          Games
        </h1>
        <NewGameModal />
      </header>
      <Searchbar className="mb-1 max-w-60" />
      <Games games={games} />
    </Card>
  )
}
