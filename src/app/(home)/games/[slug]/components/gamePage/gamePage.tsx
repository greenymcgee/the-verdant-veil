import React from 'react'

import { PageWithNavbar } from '@/app/(home)/components'
import {
  Card,
  Heading,
  HTMLParser,
  TabPanel,
  Tabs,
  Time,
  VerdantVeilRating,
} from '@/components'

import { AboutTab } from '../aboutTab'
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
          <VerdantVeilRating game={game} />
          <div
            className="mb-2 flex gap-1"
            data-testid="estimated-first-played-date"
          >
            <dt className="inline font-semibold text-neutral-900">
              First Played:{' '}
            </dt>
            <dd>
              <Time date={game.estimatedFirstPlayedDate} format="MMMM, yyyy" />
            </dd>
          </div>
          <div className="mb-2 flex gap-1" data-testid="last-played-date">
            <dt className="inline font-semibold text-neutral-900">
              Last Played:{' '}
            </dt>
            <dd>
              <Time date={game.lastPlayedDate} format="MMMM, yyyy" />
            </dd>
          </div>
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
            <header className="mb-4">
              <Heading as="h2" className="mb-1">
                {game.reviewTitle}
              </Heading>
              <p className="text-sm text-neutral-500">
                <Time
                  date={game.publishedAt ?? new Date().toISOString()}
                  format="MMMM do, yyyy"
                />
              </p>
            </header>
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
