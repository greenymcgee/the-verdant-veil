'use client'
import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import {
  ErrorBoundaryActionBar,
  HomeErrorBoundary,
} from '@/app/(home)/components'
import { Heading, PaginationWrapper, Spinner } from '@/components'
import { useGetGamesQuery } from '@/hooks/api'

import { GameFilters } from '../gameFilters'
import { Games } from '../games'
import { GamesHeader } from '../gamesHeader'
import { ValidatingGamesAlert } from '../validatingGamesAlert'

interface Props {
  fallbackTotalPages: number
}

// TODO:
// lazy load images
export function GamesContainer({ fallbackTotalPages }: Props) {
  const { error, games, isLoading, isValidating, totalPages } =
    useGetGamesQuery({ published: true })
  const searchParams = useSearchParams()
  const query = searchParams.get('query') ?? undefined

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
      <Suspense
        fallback={
          <Heading
            className="mb-3 bg-neutral-900 font-serif text-white"
            classNameOverrides={{ color: 'text-neutral-900' }}
          >
            Games
          </Heading>
        }
      >
        <GamesHeader />
      </Suspense>
      {games.length ? (
        <PaginationWrapper
          className="mb-4 justify-end"
          classNameOverrides={{ display: 'hidden lg:flex' }}
          dataTestId="games-pagination"
          route="games"
          totalPages={totalPages ?? fallbackTotalPages}
        />
      ) : null}
      <div className="gap-6 lg:grid lg:grid-cols-12">
        <GameFilters />
        <div className="md:col-span-9">
          <ValidatingGamesAlert isValidating={isValidating} />
          <Games games={games} isValidating={isValidating} query={query} />
        </div>
      </div>
      {games.length ? (
        <PaginationWrapper
          className="justify-end pt-4"
          dataTestId="games-pagination"
          route="games"
          totalPages={totalPages ?? fallbackTotalPages}
        />
      ) : null}
    </div>
  )
}
