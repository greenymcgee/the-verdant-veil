'use client'
import React from 'react'

import { Button, LinkTo, Spinner } from '@/components'
import { ROUTES } from '@/constants'
import { useSetBreadcrumbs } from '@/context'
import { useGetGamesQuery } from '@/hooks'

export function Games() {
  useSetBreadcrumbs([{ name: 'Games', route: ROUTES.games }])
  const { games, isLoading } = useGetGamesQuery()

  if (isLoading) return <Spinner className="mx-auto" size="lg" />

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
                <LinkTo href={ROUTES.adminGame(game.slug)}>{game.name}</LinkTo>
              </td>
              <td className="px-4 py-3">
                <LinkTo
                  aria-label={`Edit ${game.name}`}
                  className="mr-4"
                  href={ROUTES.adminEditGame(game.slug)}
                  leftIcon="edit"
                  size="sm"
                  variant="solid"
                />
                <Button
                  aria-label={`Delete ${game.name}`}
                  leftIcon="trash"
                  size="sm"
                  theme="danger"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
