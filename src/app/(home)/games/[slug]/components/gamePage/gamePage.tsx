import React from 'react'

import { PageWithNavbar } from '@/app/(home)/components'
import { Card, HTMLParser, Tabs } from '@/components'

import { AboutTab } from '../aboutTab'
import { CSVList } from '../csvList'
import { GreenQuestRating } from '../greenQuestRating'
import { GameHeader } from '../header'
import { MediaTab } from '../mediaTab'

interface Props {
  game: Game
}

export function GamePage({ game }: Props) {
  return (
    <PageWithNavbar activeLinkTitle="Games" bannerImage={game.bannerImage}>
      <div className="container" data-testid="game-page">
        <GameHeader game={game} />
        <Card className="mb-12" shadowTheme="light">
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
          <p className="text-neutral-500" data-testid="game-summary">
            {game.summary}
          </p>
        </Card>
        <Tabs
          panels={[
            {
              element: (
                <HTMLParser data-testid="game-review" html={game.review} />
              ),
              hash: 'review',
            },
            {
              element: <AboutTab game={game} />,
              hash: 'about',
            },
            {
              element: <MediaTab game={game} />,
              hash: 'media',
            },
          ]}
          tabs={[
            {
              hash: 'review',
              icon: 'message-draw',
              title: 'Review',
            },
            {
              hash: 'about',
              icon: 'table',
              title: 'About',
            },
            {
              hash: 'media',
              icon: 'image',
              title: 'Media',
            },
          ]}
        />
      </div>
    </PageWithNavbar>
  )
}
