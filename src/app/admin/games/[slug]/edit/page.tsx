import React, { Suspense } from 'react'
import type { Metadata } from 'next'

import { generateGameMetadata, getGame } from '@/actions'
import { AdminErrorCard, Breadcrumbs } from '@/app/admin/components'
import { Card, Heading } from '@/components'
import { ROUTES } from '@/constants'

import { EditGameForm, PartialGameCreateBanner } from './components'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return await generateGameMetadata({ pageParams: params, type: 'edit' })
}

export default async function EditGamePage({ params }: Props) {
  const { slug } = await params
  const { error, game, message } = await getGame(slug)

  if (error) return <AdminErrorCard message={message} />

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { name: 'Games', route: ROUTES.adminGames },
          { name: game.name, route: ROUTES.adminGame(game.slug) },
          { name: 'Edit', route: ROUTES.adminEditGame(game.slug) },
        ]}
      />
      <Card>
        <Heading className="mb-6">{game.name}</Heading>
        <Suspense>
          <PartialGameCreateBanner />
        </Suspense>
        <EditGameForm game={game} />
      </Card>
    </>
  )
}
