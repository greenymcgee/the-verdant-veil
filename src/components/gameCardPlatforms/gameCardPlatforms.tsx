import React from 'react'
import clsx from 'clsx'

interface Props {
  game: IndexGame
  validating: boolean
}

export function GameCardPlatforms({ game, validating }: Props) {
  return (
    <ul
      className={clsx('text-primary-800 inline max-w-[510px]', {
        skeleton: validating,
      })}
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
