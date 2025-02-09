import React from 'react'

import { getGame } from '@/actions'
import { AdminErrorCard, Breadcrumbs } from '@/app/admin/components'
import { Card } from '@/components'
import { ROUTES } from '@/constants'

import { EditGameForm, GameCreateToaster } from './components'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function EditGamePage({ params }: Props) {
  const { slug } = await params
  const { error, game, message } = await getGame(slug)

  if (error) return <AdminErrorCard message={message} />

  return (
    <>
      <GameCreateToaster game={game} />
      <Breadcrumbs
        breadcrumbs={[
          { name: 'Games', route: ROUTES.adminGames },
          { name: game.name, route: ROUTES.adminGame(game.slug) },
          { name: 'Edit', route: ROUTES.adminEditGame(game.slug) },
        ]}
      />
      <Card>
        <h1 className="mb-6">{game.name}</h1>
        <EditGameForm game={game} />
      </Card>
    </>
  )
}
