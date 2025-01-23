import React from 'react'

import { getGame } from '@/actions'
import { Card, LinkTo } from '@/components'
import { ROUTES } from '@/constants'

import { Breadcrumbs } from '../../components'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function AdminGameShowPage({ params }: Props) {
  const { slug } = await params
  const { error, game, message } = await getGame(slug)

  if (error)
    return (
      <Card>
        <header>
          <LinkTo
            className="mb-3"
            data-testid="back-to-games-link"
            href={ROUTES.adminGames}
            leftIcon="chevron-left"
            text="Back to games"
          />
          <h1 className="mb-4">Whoops! Something went wrong</h1>
          <hr className="mb-4" />
          <p className="text-danger-900">{message}</p>
        </header>
      </Card>
    )

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { name: 'Games', route: ROUTES.adminGames },
          { name: game.name, route: ROUTES.adminGame(game.slug) },
        ]}
      />
      <Card>
        <header className="mb-6">
          <h1 data-testid="main-heading">{game.name}</h1>
        </header>
        <div className="mb-8 grid grid-cols-3 gap-8">
          <div>
            <dt>Rating</dt>
            <dd>{game.rating}</dd>
          </div>
          <div>
            <dt>Published</dt>
            <dd>{game.published ? 'Yes' : 'No'}</dd>
          </div>
        </div>
        <dt>Review</dt>
        <dd>{game.review}</dd>
      </Card>
    </>
  )
}
