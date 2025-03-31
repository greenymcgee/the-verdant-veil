import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { Heading } from '@/components'
import { Time } from '@/components/time'
import { ROUTES, TRANSITION_STYLES } from '@/constants'

import { GreenQuestRating } from '../../../components'
import { GameCover } from '../gameCover'
import { GameLinkPlatforms } from '../gameLinkPlatforms'

interface Props {
  games: IndexGame[]
  isValidating: boolean
}

export function Games({ games, isValidating }: Props) {
  return (
    <ul className="space-y-6 lg:max-w-3/4" data-testid="games">
      {games.map((game) => (
        <li className={clsx({ group: !isValidating })} key={game.id}>
          <Link
            className={clsx('flex flex-col md:flex-row', {
              'pointer-events-none cursor-default select-none': isValidating,
            })}
            data-testid={`game-${game.id}`}
            href={ROUTES.game(game.slug)}
            tabIndex={isValidating ? -1 : 0}
          >
            <GameCover game={game} isValidating={isValidating} />
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
                  <span className={clsx({ skeleton: isValidating })}>
                    {game.name}
                  </span>
                </Heading>
                <Time
                  className={clsx({ skeleton: isValidating })}
                  date={game.firstReleaseDate}
                  format="MMMM do, yyyy"
                />
              </header>
              <GameLinkPlatforms game={game} isValidating={isValidating} />
              <GreenQuestRating
                className={clsx({ skeleton: isValidating })}
                game={game}
                includesTitle={false}
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
