import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'

import { GAME_CARD_VARIANTS, TRANSITION_STYLES } from '@/constants'

import { Icon } from '../icon'

interface Props {
  game: GameWithLimitedResources
  validating: boolean
  variant: keyof typeof GAME_CARD_VARIANTS
}

export function GameCardCover({ game, validating, variant }: Props) {
  return (
    <div className="relative">
      <div
        className={clsx(
          'absolute inset-0 transition-colors group-hover:bg-neutral-900/20',
          TRANSITION_STYLES.inputHover,
        )}
      />
      {validating ? (
        <div
          className={clsx(
            'flex w-full items-center justify-center bg-neutral-50',
            GAME_CARD_VARIANTS[variant].coverClassName,
          )}
          data-testid="cover-skeleton"
        >
          <Icon className="animate-pulse text-7xl" icon="image" />
        </div>
      ) : (
        <Image
          alt={`${game.name} Cover`}
          className={clsx(
            'w-full object-cover',
            GAME_CARD_VARIANTS[variant].coverClassName,
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
