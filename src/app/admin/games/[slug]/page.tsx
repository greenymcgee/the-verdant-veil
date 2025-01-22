import React from 'react'

import { getGame } from '@/actions'

import { GameShowClientSide } from './components'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function AdminGameShowPage({ params }: Props) {
  const { slug } = await params
  const { game } = await getGame(slug)

  return (
    <>
      <GameShowClientSide game={game} />
      <header className="mb-6">
        <h1>{game.name}</h1>
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
    </>
  )
}
