'use client'
import React, { useActionState } from 'react'
import { withCallbacks } from '@greenymcgee/typescript-utils'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { publishGame } from '@/actions'
import { ROUTES } from '@/constants'

import { Button } from '../button'

interface Props {
  game: Game
  onErrorCallback(unpublishableReasons: string[]): void
}

type State = FirstParameterOf<typeof publishGame>

export function PublishGameForm({ game, onErrorCallback }: Props) {
  const router = useRouter()
  const initialState: State = {
    game,
    message: '',
    status: 'IDLE',
    unpublishableReasons: [],
  }

  const callbacks = {
    onError({ message, unpublishableReasons }: State) {
      toast.error(message)
      onErrorCallback(unpublishableReasons)
    },
    onSuccess() {
      router.push(ROUTES.game(game.slug))
      toast.success(`${game.name} has been successfully published`)
    },
  }

  const [, action, isExecuting] = useActionState(
    withCallbacks(publishGame, callbacks),
    initialState,
  )

  return (
    <form
      action={action}
      className="inline-block"
      data-testid="publish-game-form"
    >
      <Button loading={isExecuting} size="sm" text="Publish" type="submit" />
    </form>
  )
}
