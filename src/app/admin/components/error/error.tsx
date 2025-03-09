'use client'
import React from 'react'

import { Card, Heading, LinkTo } from '@/components'
import { ROUTES } from '@/constants'

interface Props {
  message: string | undefined
}

export function AdminErrorCard({ message }: Props) {
  return (
    <Card data-testid="admin-error-card">
      <header>
        <LinkTo
          className="mb-3"
          data-testid="back-to-games-link"
          href={ROUTES.adminGames}
          leftIcon="chevron-left"
          text="Back to games"
        />
        <Heading className="mb-4">Whoops! Something went wrong</Heading>
        <hr className="mb-4" />
        <p className="text-danger-900">{message}</p>
      </header>
    </Card>
  )
}
