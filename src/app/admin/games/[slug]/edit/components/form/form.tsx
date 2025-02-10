'use client'

import React, { useActionState, useCallback, useEffect, useState } from 'react'
import { EditorEvents } from '@tiptap/react'
import toast from 'react-hot-toast'

import { updateGame } from '@/actions'
import {
  Button,
  InputGroup,
  Label,
  RichTextEditor,
  Spinner,
} from '@/components'
import { API_ROUTES } from '@/constants'

interface Props {
  game: Game
}

const DEFAULT_STATE: FirstParameterOf<typeof updateGame> = {
  slug: '',
}

export function EditGameForm({ game }: Props) {
  const [state = DEFAULT_STATE, action, updating] = useActionState(
    updateGame,
    { slug: game.slug },
    API_ROUTES.games,
  )
  const [review, setReview] = useState(game.review)

  const handleReviewUpdated = useCallback(
    (event: EditorEvents['update']) => setReview(event.editor.getHTML()),
    [],
  )

  useEffect(() => {
    if (!state.message) return

    toast.error(state.message)
  }, [state.message])

  if (updating) return <Spinner className="py-32" size="lg" />

  return (
    <form action={action} data-testid="edit-game-form">
      <div className="mb-8 grid grid-cols-3 gap-8">
        <InputGroup
          id="rating"
          inputProps={{
            defaultValue: game.rating,
            name: 'rating',
            step: '0.1',
            type: 'number',
          }}
          label="Rating"
        />
        <InputGroup
          id="published-at"
          inputProps={{ name: 'published-at', type: 'datetime-local' }}
          label="Published At"
        />
      </div>
      <div>
        <input name="review" type="hidden" value={review} />
        <Label className="mb-2 block cursor-auto" htmlFor="review">
          Review
        </Label>
        <RichTextEditor
          className="mb-4"
          content={state.review ?? game.review}
          data-testid="review"
          id="review"
          onUpdate={handleReviewUpdated}
        />
      </div>
      <Button
        className="ml-auto block"
        data-testid="submit-game-update-button"
        text="Submit"
        type="submit"
      />
    </form>
  )
}
