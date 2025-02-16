'use client'
import React from 'react'
import clsx from 'clsx'

import { LinkTo, Spinner } from '@/components'
import { ROUTES } from '@/constants'
import { useGetGamesQuery } from '@/hooks/api'

import { DeleteGameForm } from '../deleteGameForm'

export function Games() {
  const { games, isLoading, isValidating } = useGetGamesQuery()
  const skeleton = isLoading || isValidating

  if (isLoading && !games.length) return <Spinner className="py-32" size="lg" />

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-96 text-left" data-testid="games">
        <thead className="font-semibold">
          <tr className="border-b-1 border-primary-400 text-neutral-800">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr
              className="border-b-1 border-b-primary-400 last:border-b-0 even:bg-neutral-50 even:bg-opacity-30"
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
              <td className="whitespace-nowrap px-4 py-3">
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
  )
}
