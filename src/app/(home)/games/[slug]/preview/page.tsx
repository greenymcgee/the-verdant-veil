import React from 'react'

import { getGame } from '@/actions'
import { HomeErrorBoundary } from '@/app/(home)/components'

import { ErrorBoundaryActionBar, GamePage } from '../components'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function GamePreviewPage({ params }: Props) {
  const { slug } = await params
  const { error, game, isNotFoundError, status } = await getGame(slug)

  if (isNotFoundError) {
    return (
      <HomeErrorBoundary
        actionBar={<ErrorBoundaryActionBar />}
        activeLinkTitle="Games"
        heading="This game is lost!"
        status={status}
        subtitle={`${slug} could not be found.`}
        testId="game-not-found-error"
      />
    )
  }

  if (error) {
    return (
      <HomeErrorBoundary
        actionBar={<ErrorBoundaryActionBar />}
        activeLinkTitle="Games"
        heading="Blast! Something went wrong"
        status={status}
        subtitle={`An error occurred while retrieving ${slug}. Check back soon to continue the journey.`}
        testId="generic-game-error"
      />
    )
  }

  return <GamePage game={game} />
}
