'use client'
import React from 'react'

import { Card, LinkTo } from '@/components'
import { ROUTES } from '@/constants'

interface Props {
  message: string | undefined
}

export function AdminErrorCard({ message }: Props) {
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
}
