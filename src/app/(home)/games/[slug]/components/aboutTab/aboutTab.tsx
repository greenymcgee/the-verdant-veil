import React from 'react'

import { Card } from '@/components'

import { DetailList } from '../detailList'

interface Props {
  game: Game
}

export function AboutTab({ game }: Props) {
  return (
    <Card data-testid="about-game" variant="tabpanel">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <DetailList list={game.developers} title="Developers" />
        <DetailList list={game.publishers} title="Publishers" />
        <DetailList list={game.genres} title="Genres" />
        <DetailList list={game.gameModes} title="Game Modes" />
      </div>
      <hr className="my-4 border-b-neutral-500" />
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <DetailList list={game.themes} title="Themes" />
        <DetailList
          list={game.playerPerspectives}
          title="Player Perspectives"
        />
        <DetailList list={game.franchises} title="Franchises" />
        <DetailList list={game.gameEngines} title="Game Engines" />
      </div>
      <hr className="my-4 border-b-neutral-500" />
      <div>
        <p className="text-heading-sm mb-2 font-semibold text-neutral-800">
          Storyline
        </p>
        <p className="text-neutral-500">{game.storyline}</p>
      </div>
    </Card>
  )
}
