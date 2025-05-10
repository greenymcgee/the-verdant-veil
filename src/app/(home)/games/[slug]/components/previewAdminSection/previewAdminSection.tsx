'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'

import { Banner, PublishGameForm, UnpublishGameForm } from '@/components'

import { BackToAdmin } from '../backToAdmin'
import { RefreshGameForm } from '../refreshGameForm'

interface Props {
  game: Game
}

export function PreviewAdminSection({ game }: Props) {
  const pathname = usePathname()
  const [unpublishableReasons, setUnpublishableReasons] = useState<string[]>([])
  const [partiallyRefreshed, setPartiallyRefreshed] = useState(false)

  const handleUnpublishableError = (unpublishableReasons: string[]) =>
    setUnpublishableReasons(unpublishableReasons)

  const handlePartialRefresh = () => setPartiallyRefreshed(true)

  if (!pathname.includes('preview')) return null

  return (
    <div className="mb-8">
      {unpublishableReasons.length ? (
        <Banner as="div" className="mb-4">
          <p className="font-semibold">
            Please fix the following errors before publishing:
          </p>
          <ul className="ml-2 list-disc pl-2">
            {unpublishableReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </Banner>
      ) : null}
      {partiallyRefreshed ? (
        <Banner
          className="mb-4"
          data-testid="partial-refresh-warning"
          message={`Whoops! ${game.name} was only partially refreshed.`}
        />
      ) : null}
      <div className="flex gap-2" data-testid="preview-admin-section">
        <BackToAdmin slug={game.slug} />
        {game.published ? (
          <UnpublishGameForm game={game} />
        ) : (
          <PublishGameForm
            game={game}
            onErrorCallback={handleUnpublishableError}
          />
        )}
        <RefreshGameForm
          game={game}
          onPartialRefreshCallback={handlePartialRefresh}
        />
      </div>
    </div>
  )
}
