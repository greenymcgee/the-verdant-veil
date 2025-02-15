'use client'
import React, { useActionState, useEffect } from 'react'
import clsx from 'clsx'
import toast from 'react-hot-toast'

import { deleteGame } from '@/actions'
import { Button } from '@/components'
import { useGetGamesQuery } from '@/hooks/api'

interface Props {
  game: GameWithoutResources
}

export function DeleteGameForm({ game }: Props) {
  const { isLoading, isValidating, mutate } = useGetGamesQuery()
  const [{ isSuccess, message }, action, isDeleting] = useActionState(
    deleteGame,
    { game },
  )

  useEffect(() => {
    if (!isSuccess) return

    mutate()
    return () => {
      toast.success(`${game.name} was deleted`)
    }
  }, [game.name, isSuccess, mutate])

  useEffect(() => {
    if (!message) return

    toast.error(message)
  }, [message])

  return (
    <form action={action} className="inline-block">
      <Button
        aria-label={`Delete ${game.name}`}
        className={clsx({
          skeleton: isLoading || isValidating || isDeleting || isSuccess,
        })}
        leftIcon="trash"
        size="sm"
        theme="danger"
        type="submit"
      />
    </form>
  )
}
