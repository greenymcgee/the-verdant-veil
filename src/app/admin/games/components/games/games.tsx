'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

import { PaginationWrapper, Searchbar, Spinner } from '@/components'
import { useGetGamesQuery } from '@/hooks/api'

import { GamesTable } from '../gamesTable'

interface Props {
  fallbackTotalPages: number
}

export function Games({ fallbackTotalPages }: Props) {
  const { games, isLoading, isValidating, totalPages } = useGetGamesQuery()
  const searchParams = useSearchParams()
  const query = searchParams.get('query') ?? undefined

  if (isLoading && !games.length) return <Spinner className="py-32" size="lg" />

  return (
    <>
      <Searchbar
        className="mb-1 max-w-60"
        inputProps={{
          autoComplete: 'off',
          autoFocus: Boolean(query),
          defaultValue: query,
        }}
      />
      <GamesTable
        games={games}
        query={query}
        showingSkeletons={isLoading || isValidating}
      />
      <PaginationWrapper
        className="justify-end"
        dataTestId="admin-games-pagination"
        route="adminGames"
        totalPages={totalPages ?? fallbackTotalPages}
      />
    </>
  )
}
