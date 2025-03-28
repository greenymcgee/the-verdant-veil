'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

import { PublishGameForm, UnpublishGameForm } from '@/components'

import { BackToAdmin } from '../backToAdmin'

interface Props {
  game: Game
}

export function PreviewAdminSection({ game }: Props) {
  const pathname = usePathname()

  if (!pathname.includes('preview')) return null

  return (
    <div className="mb-8 flex gap-2" data-testid="preview-admin-section">
      <BackToAdmin slug={game.slug} />
      {game.published ? (
        <UnpublishGameForm game={game} />
      ) : (
        <PublishGameForm game={game} />
      )}
    </div>
  )
}
