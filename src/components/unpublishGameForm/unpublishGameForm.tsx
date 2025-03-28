'use client'
import React, { useActionState } from 'react'
import toast from 'react-hot-toast'

import { revalidateGamePreview, unpublishGame } from '@/actions'
import { withCallbacks } from '@/utils'

import { Button } from '../button'

interface Props {
  game: Game
}

type State = FirstParameterOf<typeof unpublishGame>

export function UnpublishGameForm({ game }: Props) {
  const callbacks = {
    async onError(result: State) {
      toast.error(result.message)
    },
    async onSuccess() {
      await revalidateGamePreview(game.slug)
      toast.success(`${game.name} has been successfully unpublished`)
    },
  }

  const initialState: State = { game, message: '', status: 'idle' }

  const [, action, isExecuting] = useActionState(
    withCallbacks(unpublishGame, callbacks),
    initialState,
  )

  return (
    <form
      action={action}
      className="inline-block"
      data-testid="unpublish-game-form"
    >
      <Button loading={isExecuting} size="sm" text="Unpublish" type="submit" />
    </form>
  )
}
