import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'

import { Icon } from '@/components'
import { TRANSITION_STYLES } from '@/constants'

interface Props {
  game: IndexGame
  isValidating: boolean
}

export function GameCover({ game, isValidating }: Props) {
  return (
    <div className="relative">
      <div
        className={clsx(
          TRANSITION_STYLES.inputHover,
          'absolute inset-0 transition-colors group-hover:bg-neutral-900/20',
        )}
      />
      {isValidating ? (
        <div
          className={clsx(
            'flex h-96 w-full items-center justify-center',
            'rounded-t-lg bg-neutral-50',
            'md:h-64 md:w-48 md:rounded-none md:rounded-s-lg',
          )}
          data-testid="cover-skeleton"
        >
          <Icon className="animate-pulse text-7xl" icon="image" />
        </div>
      ) : (
        <Image
          alt={`${game.name} Cover`}
          className={clsx(
            'h-96 w-full rounded-t-lg object-cover',
            'md:h-auto md:w-48 md:rounded-none md:rounded-s-lg',
          )}
          data-testid="game-cover"
          height={game.cover.height}
          src={game.cover.url}
          width={game.cover.width}
        />
      )}
    </div>
  )
}
