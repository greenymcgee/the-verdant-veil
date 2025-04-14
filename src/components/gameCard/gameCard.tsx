import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { ROUTES, TRANSITION_STYLES } from '@/constants'

import { GameCardPlatforms } from '../gameCardPlatforms'
import { GameCover } from '../gameCover'
import { GreenQuestRating } from '../greenQuestRating'
import { Heading } from '../heading'
import { Time } from '../time'

interface Props {
  game: IndexGame
  validating: boolean
}

export function GameCard({ game, validating }: Props) {
  return (
    <Link
      className={clsx('flex flex-col rounded-lg md:flex-row', {
        'pointer-events-none cursor-default select-none': validating,
      })}
      data-testid={`game-${game.id}`}
      href={ROUTES.game(game.slug)}
      tabIndex={validating ? -1 : 0}
    >
      <GameCover game={game} validating={validating} />
      <div
        className={clsx(
          TRANSITION_STYLES.inputHover,
          'transition-color bg-white group-hover:bg-neutral-50',
          'flex grow-1 flex-col justify-center gap-3',
          'overflow-x-auto rounded-b-lg p-4 md:rounded-none md:rounded-e-lg',
        )}
      >
        <header>
          <Heading
            as="h2"
            className="mb-1 max-w-[510px]"
            classNameOverrides={{
              color: 'text-neutral-900',
              fontSize: 'text-heading-md',
            }}
          >
            <span className={clsx({ skeleton: validating })}>{game.name}</span>
          </Heading>
          <Time
            className={clsx({ skeleton: validating })}
            date={game.firstReleaseDate}
            format="MMMM do, yyyy"
          />
        </header>
        <GameCardPlatforms game={game} validating={validating} />
        <GreenQuestRating
          className={clsx({ skeleton: validating })}
          game={game}
          includesTitle={false}
        />
      </div>
    </Link>
  )
}
