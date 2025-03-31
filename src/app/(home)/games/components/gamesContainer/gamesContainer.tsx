'use client'
import React from 'react'

import {
  ErrorBoundaryActionBar,
  HomeErrorBoundary,
} from '@/app/(home)/components'
import { Heading, PaginationWrapper, Spinner } from '@/components'
import { useGetGamesQuery } from '@/hooks/api'

import { Games } from '../games'
import { ValidatingGamesAlert } from '../validatingGamesAlert'

interface Props {
  fallbackTotalPages: number
}

// TODO:
// search bar
// lazy load images
// style pagination
export function GamesContainer({ fallbackTotalPages }: Props) {
  const { error, games, isLoading, isValidating, totalPages } =
    useGetGamesQuery()

  if (isLoading && !games.length) return <Spinner className="py-32" size="lg" />

  if (error)
    return (
      <HomeErrorBoundary
        actionBar={<ErrorBoundaryActionBar />}
        heading="Blast! Something went wrong"
        status={error?.status}
        subtitle={
          'An error occurred while retrieving games. Check back soon to continue the journey.'
        }
        testId="games-error"
      />
    )

  return (
    <div className="container" data-testid="games-container">
      <Heading
        className="mb-3 bg-neutral-900 font-serif text-white"
        classNameOverrides={{ color: 'text-neutral-900' }}
      >
        Games
      </Heading>
      <PaginationWrapper
        className="mb-4 justify-end lg:max-w-3/4"
        dataTestId="games-pagination"
        route="games"
        totalPages={totalPages ?? fallbackTotalPages}
      />
      <ValidatingGamesAlert isValidating={isValidating} />
      <Games games={games} isValidating={isValidating} />
      <PaginationWrapper
        className="justify-end pt-4 lg:max-w-3/4"
        dataTestId="games-pagination"
        route="games"
        totalPages={totalPages ?? fallbackTotalPages}
      />
    </div>
  )
}
