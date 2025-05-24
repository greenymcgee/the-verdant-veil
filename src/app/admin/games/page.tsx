import React from 'react'
import type { Metadata } from 'next'
import { SWRConfig } from 'swr'

import { getGames } from '@/actions'
import { Card, Heading } from '@/components'
import { API_ROUTES } from '@/constants'

import { AdminErrorCard } from '../components'
import { Games, NewGameModal } from './components'

export const metadata: Metadata = { title: 'Admin Games' }

export default async function AdminGamesPage() {
  const { error, games, message, totalPages } = await getGames()

  if (error) return <AdminErrorCard message={message} />

  return (
    <SWRConfig value={{ fallback: { [API_ROUTES.games]: { games } } }}>
      <Card>
        <header className="mb-8 flex items-center justify-between">
          <Heading data-testid="main-heading">Games</Heading>
          <NewGameModal />
        </header>
        <Games fallbackTotalPages={totalPages} />
      </Card>
    </SWRConfig>
  )
}
