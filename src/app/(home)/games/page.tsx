import React from 'react'
import { SWRConfig } from 'swr'

import { getGames } from '@/actions'
import { API_ROUTES } from '@/constants'

import {
  ErrorBoundaryActionBar,
  HomeErrorBoundary,
  PageWithNavbar,
} from '../components'
import { GamesContainer } from './components'

export default async function GamesPage() {
  const { error, games, status, totalPages } = await getGames()

  if (error) {
    return (
      <PageWithNavbar activeLinkTitle="Games">
        <HomeErrorBoundary
          actionBar={<ErrorBoundaryActionBar />}
          heading="Blast! Something went wrong"
          status={status}
          subtitle={
            'An error occurred while retrieving games. Check back soon to continue the journey.'
          }
          testId="games-error"
        />
      </PageWithNavbar>
    )
  }

  return (
    <SWRConfig value={{ fallback: { [API_ROUTES.games]: { games } } }}>
      <PageWithNavbar activeLinkTitle="Games">
        <GamesContainer fallbackTotalPages={totalPages} />
      </PageWithNavbar>
    </SWRConfig>
  )
}
