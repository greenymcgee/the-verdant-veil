'use client'

import React, {
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
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
import { formatDatetimeInputValue, toCurrentTimezone } from '@/utils'

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

  const publishedAt = useMemo(() => {
    if (!state.publishedAt && !game.publishedAt) return ''

    return formatDatetimeInputValue(
      toCurrentTimezone(state.publishedAt ?? game.publishedAt),
    )
  }, [game.publishedAt, state.publishedAt])

  useEffect(() => {
    if (!state.message) return

    toast.error(state.message)
  }, [state.message])

  if (updating) return <Spinner className="py-32" size="lg" />

  return (
    <form action={action} data-testid="edit-game-form">
      <input
        name="timezone"
        type="hidden"
        value={Intl.DateTimeFormat().resolvedOptions().timeZone}
      />
      <div className="mb-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <InputGroup
          id="currently-playing"
          inputProps={{
            defaultChecked:
              state.currentlyPlaying !== undefined
                ? state.currentlyPlaying
                : game.currentlyPlaying,
            name: 'game[currently_playing]',
            type: 'checkbox',
          }}
          label="Currently Playing"
        />
        <InputGroup
          id="rating"
          inputProps={{
            defaultValue: state.rating ?? game.rating,
            name: 'game[rating]',
            step: '1',
            type: 'number',
          }}
          label="Rating"
        />
        <InputGroup
          id="published-at"
          inputProps={{
            defaultValue: publishedAt,
            name: 'game[published_at]',
            type: 'datetime-local',
          }}
          label="Published At"
        />
        <InputGroup
          id="banner-image"
          inputProps={{
            accept: 'image/png, image/jpg, image/jpeg, image/webp',
            name: 'game[banner_image]',
            type: 'file',
          }}
          label="Banner Image"
        />
        <InputGroup
          id="featured-video-id"
          inputProps={{
            defaultValue: state.featuredVideoId ?? game.featuredVideoId,
            name: 'game[featured_video_id]',
          }}
          label="Featured Video ID"
        />
      </div>
      <div>
        <input
          name="game[review]"
          type="hidden"
          value={state.review ?? review}
        />
        <Label className="mb-2 block cursor-auto" htmlFor="review">
          Review
        </Label>
        <RichTextEditor
          className="mb-4"
          content={state.review ?? review}
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
