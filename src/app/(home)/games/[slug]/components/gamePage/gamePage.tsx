import React from 'react'

import { PageWithNavbar } from '@/app/(home)/components'
import { Card, Heading, HTMLParser, Tabs } from '@/components'

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
          <p data-testid="game-summary">{game.summary}</p>
        </Card>
        <Tabs
          panels={[
            {
              element: <HTMLParser html={game.review} />,
              hash: 'review',
            },
            {
              element: <Heading as="h2">About</Heading>,
              hash: 'about',
            },
            {
              element: <Heading as="h2">Media</Heading>,
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
