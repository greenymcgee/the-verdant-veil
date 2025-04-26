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
import { API_ROUTES, GAME_FORM_NAMES } from '@/constants'

import { getFormDates } from './utils'

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

  const { estimatedFirstPlayedDate, lastPlayedDate, publishedAt } = useMemo(
    () => getFormDates(game, state),
    [game, state],
  )

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
      <InputGroup
        className="mb-4"
        id="currently-playing"
        inputProps={{
          defaultChecked:
            state.currentlyPlaying !== undefined
              ? state.currentlyPlaying
              : game.currentlyPlaying,
          name: GAME_FORM_NAMES.CURRENTLY_PLAYING,
          type: 'checkbox',
        }}
        label="Currently Playing"
      />

      <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <InputGroup
          id="banner-image"
          inputProps={{
            accept: 'image/png, image/jpg, image/jpeg, image/webp',
            name: GAME_FORM_NAMES.BANNER_IMAGE,
            type: 'file',
          }}
          label="Banner Image"
        />
        <InputGroup
          id="rating"
          inputProps={{
            defaultValue: state.rating ?? game.rating,
            name: GAME_FORM_NAMES.RATING,
            step: '1',
            type: 'number',
          }}
          label="Rating"
        />
        <InputGroup
          id="featured-video-id"
          inputProps={{
            autoComplete: 'off',
            defaultValue: state.featuredVideoId ?? game.featuredVideoId,
            name: GAME_FORM_NAMES.FEATURED_VIDEO_ID,
          }}
          label="Featured Video ID"
        />
        <InputGroup
          id="published-at"
          inputProps={{
            defaultValue: publishedAt,
            name: GAME_FORM_NAMES.PUBLISHED_AT,
            type: 'datetime-local',
          }}
          label="Published At"
        />
        <InputGroup
          id="estimated-first-played-dat3e"
          inputProps={{
            defaultValue: estimatedFirstPlayedDate,
            name: GAME_FORM_NAMES.ESTIMATED_FIRST_PLAYED_DATE,
            type: 'date',
          }}
          label="Estimated First Played Date"
        />
        <InputGroup
          id="last-played-date"
          inputProps={{
            defaultValue: lastPlayedDate,
            name: GAME_FORM_NAMES.LAST_PLAYED_DATE,
            type: 'date',
          }}
          label="Last Played Date"
        />
        <InputGroup
          id="review-title"
          inputProps={{
            autoComplete: 'off',
            defaultValue: state.reviewTitle ?? game.reviewTitle,
            name: GAME_FORM_NAMES.REVIEW_TITLE,
          }}
          label="Review Title"
        />
      </div>

      <div>
        <input
          name={GAME_FORM_NAMES.REVIEW}
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
