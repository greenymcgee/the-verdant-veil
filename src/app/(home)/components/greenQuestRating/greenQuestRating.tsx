import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

import { LogoSword } from '@/components'

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  game: GameWithoutResources
  includesTitle?: boolean
}

export function GreenQuestRating({
  className,
  game,
  includesTitle = true,
  ...options
}: Props) {
  return (
    <p
      className={clsx(
        'mb-2 flex items-center gap-2 font-semibold text-neutral-900',
        className,
      )}
      data-testid="green-quest-rating"
      {...options}
    >
      {includesTitle ? 'Green Quest Rating' : null}
      <span className="sr-only">{`${game.rating} out of 5`}</span>
      <span aria-hidden className="inline-flex gap-1">
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
