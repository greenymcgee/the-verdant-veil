import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'

import { TRANSITION_STYLES } from '@/constants'

import { Icon } from '../icon'

interface Props {
  game: IndexGame
  validating: boolean
}

export function GameCover({ game, validating }: Props) {
  return (
    <div className="relative">
      <div
        className={clsx(
          TRANSITION_STYLES.inputHover,
          'absolute inset-0 transition-colors group-hover:bg-neutral-900/20',
        )}
      />
      {validating ? (
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
