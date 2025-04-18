import React, { ElementType, HTMLAttributes } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { GAME_CARD_VARIANTS, ROUTES, TRANSITION_STYLES } from '@/constants'

import { GameCardCover } from '../gameCardCover'
import { GameCardPlatforms } from '../gameCardPlatforms'
import { GreenQuestRating } from '../greenQuestRating'
import { Heading } from '../heading'
import { Time } from '../time'

interface Props extends HTMLAttributes<HTMLLIElement> {
  as?: ElementType
  game: GameWithLimitedResources
  headingProps?: PropsOf<typeof Heading>
  validating: boolean
  variant?: keyof typeof GAME_CARD_VARIANTS
}

export function GameCard({
  as: As = 'div',
  className,
  game,
  headingProps = {},
  validating,
  variant = 'list',
  ...options
}: Props) {
  const { as: headingAs = 'h2', ...headingOptions } = headingProps

  return (
    <As
      className={clsx(
        className,
        'ring-ring-color rounded-lg focus-within:ring-2',
        { group: !validating },
      )}
      {...options}
    >
      <Link
        className={clsx(GAME_CARD_VARIANTS[variant].linkClassName, {
          'pointer-events-none cursor-default select-none': validating,
        })}
        data-testid={`game-${game.id}`}
        href={ROUTES.game(game.slug)}
        tabIndex={validating ? -1 : 0}
      >
        <GameCardCover game={game} validating={validating} variant={variant} />
        <div
          className={clsx(
            TRANSITION_STYLES.inputHover,
            'transition-color bg-white group-hover:bg-neutral-50',
            'flex grow-1 flex-col justify-center gap-3',
            'overflow-x-auto p-4',
            GAME_CARD_VARIANTS[variant].divClassName,
          )}
        >
          <header>
            <Heading
              as={headingAs}
              className={clsx(
                'mb-1 max-w-[510px]',
                GAME_CARD_VARIANTS[variant].heading,
              )}
              classNameOverrides={{
                color: 'text-neutral-900',
                fontSize: 'text-heading-md',
              }}
              {...headingOptions}
            >
              <span className={clsx({ skeleton: validating })}>
                {game.name}
              </span>
            </Heading>
            <Time
              className={clsx({ skeleton: validating })}
              date={game.firstReleaseDate}
              format="MMMM do, yyyy"
            />
          </header>
          <GameCardPlatforms
            game={game}
            validating={validating}
            variant={variant}
          />
          <GreenQuestRating
            className={clsx({ skeleton: validating })}
            game={game}
            includesTitle={false}
          />
        </div>
      </Link>
    </As>
  )
}
