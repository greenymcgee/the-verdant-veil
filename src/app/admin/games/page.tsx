import React from 'react'
import { SWRConfig } from 'swr'

import { getGames } from '@/actions'
import { Card } from '@/components'
import { API_ROUTES } from '@/constants'

import { AdminErrorCard } from '../components'
import { Games, NewGameModal } from './components'

export default async function AdminGamesPage() {
  const { error, games, message, totalPages } = await getGames()

  if (error) return <AdminErrorCard message={message} />

  return (
    <SWRConfig value={{ fallback: { [API_ROUTES.games]: { games } } }}>
      <Card>
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-neutral-800" data-testid="main-heading">
            Games
          </h1>
          <NewGameModal />
        </header>
        <Games fallbackTotalPages={totalPages} />
      </Card>
    </SWRConfig>
  )
}
