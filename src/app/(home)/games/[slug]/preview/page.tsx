import React from 'react'

import { getGame } from '@/actions'
import {
  ErrorBoundaryActionBar,
  HomeErrorBoundary,
  PageWithNavbar,
} from '@/app/(home)/components'

import { GamePage } from '../components'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function GamePreviewPage({ params }: Props) {
  const { slug } = await params
  const { error, game, isNotFoundError, status } = await getGame(slug)

  if (isNotFoundError) {
    return (
      <PageWithNavbar activeLinkTitle="Games">
        <HomeErrorBoundary
          actionBar={<ErrorBoundaryActionBar />}
          heading="This game is lost!"
          status={status}
          subtitle={`${slug} could not be found.`}
          testId="game-not-found-error"
        />
      </PageWithNavbar>
    )
  }

  if (error) {
    return (
      <PageWithNavbar activeLinkTitle="Games">
        <HomeErrorBoundary
          actionBar={<ErrorBoundaryActionBar />}
          heading="Blast! Something went wrong"
          status={status}
          subtitle={`An error occurred while retrieving ${slug}. Check back soon to continue the journey.`}
          testId="generic-game-error"
        />
      </PageWithNavbar>
    )
  }

  return <GamePage game={game} />
}
