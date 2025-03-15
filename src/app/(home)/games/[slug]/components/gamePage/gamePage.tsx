import React from 'react'

import { PageWithNavbar } from '@/app/(home)/components'
import { Card } from '@/components'

import { CSVList } from '../csvList'
import { GreenQuestRating } from '../greenQuestRating'
import { GameHeader } from '../header'

interface Props {
  game: Game
}

export function GamePage({ game }: Props) {
  return (
    <PageWithNavbar activeLinkTitle="Games" bannerImage={game.bannerImage}>
      <div className="container" data-testid="game-page">
        <GameHeader game={game} />
        <Card className="mb-8">
          <GreenQuestRating game={game} />
          <CSVList
            listItems={game.genres}
            name="Genres"
            testId="genres-csv-list"
          />
          <CSVList
            listItems={game.platforms}
            name="Platforms"
            testId="platforms-csv-list"
          />
          <p data-testid="game-summary">{game.summary}</p>
        </Card>
        {/* <Tabs
          tabs={[
            { icon: 'message-draw', title: 'Review' },
            { icon: 'table', title: 'About' },
            { icon: 'image', title: 'Media' },
          ]}
        /> */}
      </div>
    </PageWithNavbar>
  )
}
