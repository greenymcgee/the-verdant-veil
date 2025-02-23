'use client'
import React from 'react'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'

import {
  LinkTo,
  PaginationWrapper,
  Searchbar,
  Spinner,
  Table,
  Td,
  Th,
  Tr,
} from '@/components'
import { ROUTES } from '@/constants'
import { useGetGamesQuery } from '@/hooks/api'

import { DeleteGameForm } from '../deleteGameForm'

interface Props {
  fallbackTotalPages: number
}

export function Games({ fallbackTotalPages }: Props) {
  const { games, isLoading, isValidating, totalPages } = useGetGamesQuery()
  const skeleton = isLoading || isValidating
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
      <Table
        header={
          <>
            <Th text="Name" />
            <Th text="IGDB ID" />
            <Th text="Actions" />
          </>
        }
      >
        {games.map((game) => (
          <Tr key={game.id}>
            <Td>
              <LinkTo
                className={clsx({ skeleton })}
                href={ROUTES.adminGame(game.slug)}
              >
                {game.name}
              </LinkTo>
            </Td>
            <Td>
              <span className={clsx({ skeleton })}>{game.igdbId}</span>
            </Td>
            <Td>
              <LinkTo
                aria-label={`Edit ${game.name}`}
                className={clsx('mr-4', { skeleton })}
                href={ROUTES.adminEditGame(game.slug)}
                leftIcon="edit"
                size="sm"
                variant="solid"
              />
              <DeleteGameForm game={game} />
            </Td>
          </Tr>
        ))}
      </Table>
      <PaginationWrapper
        dataTestId="admin-games-pagination"
        route="adminGames"
        totalPages={totalPages ?? fallbackTotalPages}
      />
    </>
  )
}
