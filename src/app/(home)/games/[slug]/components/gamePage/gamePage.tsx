import React from 'react'

import { GreenQuestRating, PageWithNavbar } from '@/app/(home)/components'
import { Card, HTMLParser, TabPanel, Tabs } from '@/components'

import { AboutTab } from '../aboutTab'
import { CSVList } from '../csvList'
import { GameHeader } from '../header'
import { MediaTab } from '../mediaTab'

interface Props {
  game: Game
}

const REVIEW_HASH = 'review'
const ABOUT_HASH = 'about'
const MEDIA_HASH = 'media'

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
          tabs={[
            {
              hash: REVIEW_HASH,
              icon: 'message-draw',
              title: 'Review',
            },
            {
              hash: ABOUT_HASH,
              icon: 'table',
              title: 'About',
            },
            {
              hash: MEDIA_HASH,
              icon: 'image',
              title: 'Media',
            },
          ]}
        />
        <TabPanel defaultActive hash={REVIEW_HASH}>
          <Card variant="tabpanel">
            <HTMLParser data-testid="game-review" html={game.review} />
          </Card>
        </TabPanel>
        <TabPanel hash={ABOUT_HASH}>
          <AboutTab game={game} />
        </TabPanel>
        <TabPanel hash={MEDIA_HASH}>
          <MediaTab game={game} />
        </TabPanel>
      </div>
    </PageWithNavbar>
  )
}
