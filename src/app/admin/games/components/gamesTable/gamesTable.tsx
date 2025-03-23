'use client'
import React from 'react'
import clsx from 'clsx'

import { Icon, LinkTo, Table, Td, Th, Tr } from '@/components'
import { ROUTES } from '@/constants'

import { DeleteGameForm } from '../deleteGameForm'

interface Props {
  games: GameWithoutResources[]
  query: string | undefined
  showingSkeletons: boolean
}

export function GamesTable({ games, query, showingSkeletons }: Props) {
  if (!games.length)
    return (
      <p
        className={clsx(
          'text-heading-md mb-8 flex items-center justify-center gap-1 pt-8',
          'text-center font-semibold text-neutral-700',
        )}
        data-testid="empty-games-message"
      >
        <span
          aria-hidden
          className={clsx(
            'bg-warning-700 border-warning-300 inline-flex border text-3xl text-white',
            'rounded-full border p-1',
          )}
        >
          <Icon className="inline" icon="magnify" />
        </span>{' '}
        There aren&apos;t any games matching
        <span className="text-primary-800">&quot;{query}&quot;</span>
      </p>
    )

  return (
    <Table
      className="mb-4"
      data-testid="games-table"
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
              className={clsx({ skeleton: showingSkeletons })}
              href={ROUTES.adminGame(game.slug)}
            >
              {game.name}
            </LinkTo>
          </Td>
          <Td>
            <span className={clsx({ skeleton: showingSkeletons })}>
              {game.igdbId}
            </span>
          </Td>
          <Td className="whitespace-nowrap">
            <LinkTo
              aria-label={`Edit ${game.name}`}
              className={clsx('mr-4', { skeleton: showingSkeletons })}
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
  )
}
