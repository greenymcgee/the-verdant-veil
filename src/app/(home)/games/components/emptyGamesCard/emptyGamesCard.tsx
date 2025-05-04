import React from 'react'
import clsx from 'clsx'

import { Card, Icon } from '@/components'

interface Props {
  query: string | undefined
}

export function EmptyGamesCard({ query }: Props) {
  return (
    <Card
      className="text-center"
      classNameOverrides={{
        backgroundColor: 'bg-primary-50',
        padding: 'px-3 py-12',
      }}
    >
      <p
        className="text-heading-md mb-3 flex flex-col items-center justify-center gap-2 font-semibold"
        data-testid="empty-games-message"
      >
        <span
          aria-hidden
          className={clsx(
            'bg-warning-600 border-warning-300 inline-flex border text-3xl',
            'rounded-full border p-1 text-white',
          )}
        >
          <Icon className="inline" icon="magnify" />
        </span>{' '}
        <span>
          {query ? (
            <>
              No games found for{' '}
              <span className="text-primary-800">&quot;{query}&quot;</span>
            </>
          ) : (
            'No games found'
          )}
        </span>
      </p>
      <p className="text-neutral-500">
        {query
          ? `We couldn't find any games matching "${query}". Please try refining your search.`
          : 'No games matching the given criteria were able to be found.'}
      </p>
    </Card>
  )
}
