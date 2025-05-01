'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'

import { PublishGameForm, UnpublishGameForm } from '@/components'

import { BackToAdmin } from '../backToAdmin'

interface Props {
  game: Game
}

export function PreviewAdminSection({ game }: Props) {
  const pathname = usePathname()
  const [unpublishableReasons, setUnpublishableReasons] = useState<string[]>([])

  const handleUnpublishableError = (unpublishableReasons: string[]) =>
    setUnpublishableReasons(unpublishableReasons)

  if (!pathname.includes('preview')) return null

  return (
    <div className="mb-8">
      {unpublishableReasons.length ? (
        <div className="border-danger-500 text-danger-900 mb-8 rounded-lg bg-white p-3">
          <p className="font-semibold">
            Please fix the following errors before publishing:
          </p>
          <ul className="ml-2 list-disc pl-2">
            {unpublishableReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
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
      </div>
    </div>
  )
}
