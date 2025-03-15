import React from 'react'
import clsx from 'clsx'

import { LogoSword } from '@/components'

interface Props {
  game: Game
}

export function GreenQuestRating({ game }: Props) {
  return (
    <p
      className="mb-2 flex items-center gap-2 font-semibold text-neutral-900"
      data-testid="green-quest-rating"
    >
      Green Quest Rating:
      <span
        aria-label={`${game.rating} out of 5`}
        className="inline-flex gap-1"
      >
        {Array.from({ length: 5 }, (_, index) => index).map((interval) => (
          <LogoSword
            className={clsx('-rotate-45 text-2xl', {
              'text-neutral-200': interval + 1 >= game.rating,
              'text-primary-900': interval + 1 <= game.rating,
            })}
            key={interval}
          />
        ))}
      </span>
    </p>
  )
}
