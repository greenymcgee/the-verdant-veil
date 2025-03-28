'use client'
import React, { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { publishGame } from '@/actions'
import { ROUTES } from '@/constants'
import { withCallbacks } from '@/utils'

import { Button } from '../button'

interface Props {
  game: Game
}

type State = FirstParameterOf<typeof publishGame>

export function PublishGameForm({ game }: Props) {
  const router = useRouter()
  const initialState: State = {
    game,
    message: '',
    status: 'idle',
  }

  const callbacks = {
    async onError({ message }: State) {
      toast.error(message)
    },
    async onSuccess() {
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
