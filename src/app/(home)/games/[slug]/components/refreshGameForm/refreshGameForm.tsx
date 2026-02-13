'use client'
import React, { useActionState } from 'react'
import { withCallbacks } from '@greenymcgee/typescript-utils'
import toast from 'react-hot-toast'

import { refreshGame } from '@/actions'
import { Button } from '@/components'

interface Props {
  game: Game
  onPartialRefreshCallback(): void
}

type State = FirstParameterOf<typeof refreshGame>

export function RefreshGameForm({ game, onPartialRefreshCallback }: Props) {
  const initialState: State = {
    game,
    message: '',
    status: 'IDLE',
  }

  const callbacks = {
    onError({ message }: State) {
      toast.error(message)
    },
    onSuccess({ responseStatus }: State) {
      toast.success(`${game.name} has been successfully refreshed`)
      if (responseStatus !== 207) return

      onPartialRefreshCallback()
    },
  }

  const [, action, isExecuting] = useActionState(
    withCallbacks(refreshGame, callbacks),
    initialState,
  )

  return (
    <form
      action={action}
      className="inline-block"
      data-testid="refresh-game-form"
    >
      <Button
        loading={isExecuting}
        size="sm"
        text="Refresh IGDB Data"
        type="submit"
      />
    </form>
  )
}
