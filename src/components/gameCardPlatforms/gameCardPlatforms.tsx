import React from 'react'
import clsx from 'clsx'

import { GAME_CARD_VARIANTS } from '@/constants'

interface Props {
  game: GameWithLimitedResources
  validating: boolean
  variant: keyof typeof GAME_CARD_VARIANTS
}

export function GameCardPlatforms({ game, validating, variant }: Props) {
  return (
    <ul
      className={clsx(
        'text-primary-800 inline max-w-[510px]',
        GAME_CARD_VARIANTS[variant].platforms,
        {
          skeleton: validating,
        },
      )}
    >
      {game.platforms.map((platform) => (
        <li
          className={clsx(
            'text-body-lg mr-1 inline',
            "after:content-[','] last:mr-0 last:after:content-none",
          )}
          key={platform.id}
        >
          {platform.name}
        </li>
      ))}
    </ul>
  )
}
