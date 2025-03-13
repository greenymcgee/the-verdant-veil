import React from 'react'

import { getGame } from '@/actions'
import { Card, Heading, HTMLParser, LinkTo } from '@/components'
import { ROUTES } from '@/constants'

import { AdminErrorCard, Breadcrumbs } from '../../components'
import { GameUpdateToaster } from './components'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function AdminGameShowPage({ params }: Props) {
  const { slug } = await params
  const { error, game, message } = await getGame(slug)

  if (error) return <AdminErrorCard message={message} />

  return (
    <>
      <GameUpdateToaster game={game} />
      <Breadcrumbs
        breadcrumbs={[
          { name: 'Games', route: ROUTES.adminGames },
          { name: game.name, route: ROUTES.adminGame(game.slug) },
        ]}
      />
      <Card>
        <div
          className="mb-4 aspect-3/1 max-w-full"
          style={{ backgroundImage: `url(${game.bannerImage.url})` }}
        />
        <header className="mb-6 flex items-center justify-between gap-6">
          <Heading data-testid="main-heading">{game.name}</Heading>
          <LinkTo
            href={ROUTES.adminEditGame(game.slug)}
            leftIcon="edit"
            size="sm"
            text="Edit"
            variant="solid"
          />
        </header>
        <div className="mb-8 grid grid-cols-3 gap-8">
          <div>
            <dt className="text-body-sm font-semibold">Rating</dt>
            <dd>{game.rating}</dd>
          </div>
          <div>
            <dt className="text-body-sm font-semibold">Published</dt>
            <dd>{game.published ? 'Yes' : 'No'}</dd>
          </div>
        </div>
        <dt className="text-body-sm font-semibold">Review</dt>
        <dd>
          <HTMLParser data-testid="review" html={game.review} />
        </dd>
      </Card>
    </>
  )
}
