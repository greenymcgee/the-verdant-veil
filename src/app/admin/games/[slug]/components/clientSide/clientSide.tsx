'use client'
import React from 'react'

import { ROUTES } from '@/constants'
import { useSetBreadcrumbs } from '@/context'

interface Props {
  game: Game
}

export function GameShowClientSide({ game }: Props) {
  useSetBreadcrumbs([
    { name: 'Games', route: ROUTES.adminGames },
    { name: game.name, route: ROUTES.adminGame(game.slug) },
  ])
  return <></>
}
