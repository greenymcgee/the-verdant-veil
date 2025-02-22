'use client'
import React from 'react'
import clsx from 'clsx'

import { LinkTo, PaginationWrapper, Spinner } from '@/components'
import { ROUTES } from '@/constants'
import { useGetGamesQuery } from '@/hooks/api'

import { DeleteGameForm } from '../deleteGameForm'

interface Props {
  fallbackTotalPages: number
}

export function Games({ fallbackTotalPages }: Props) {
  const { games, isLoading, isValidating, totalPages } = useGetGamesQuery()
  const skeleton = isLoading || isValidating

  if (isLoading && !games.length) return <Spinner className="py-32" size="lg" />

  return (
    <>
      <div className="mb-4 overflow-x-auto">
        <table className="w-full min-w-124 text-left" data-testid="games">
          <thead className="font-semibold">
            <tr className="border-primary-400 border-b-1 text-neutral-800">
              <th className="px-4 py-3 whitespace-nowrap">Name</th>
              <th className="px-4 py-3 whitespace-nowrap">IGDB ID</th>
              <th className="px-4 py-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr
                className="border-b-primary-400 border-b-1 last:border-b-0 even:bg-neutral-50/30"
                key={game.id}
              >
                <td className="px-4 py-3">
                  <LinkTo
                    className={clsx({ skeleton })}
                    href={ROUTES.adminGame(game.slug)}
                  >
                    {game.name}
                  </LinkTo>
                </td>
                <td className="px-4 py-3">
                  <span className={clsx({ skeleton })}>{game.igdbId}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <LinkTo
                    aria-label={`Edit ${game.name}`}
                    className={clsx('mr-4', { skeleton })}
                    href={ROUTES.adminEditGame(game.slug)}
                    leftIcon="edit"
                    size="sm"
                    variant="solid"
                  />
                  <DeleteGameForm game={game} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationWrapper
        dataTestId="admin-games-pagination"
        route="adminGames"
        totalPages={totalPages ?? fallbackTotalPages}
      />
    </>
  )
}
