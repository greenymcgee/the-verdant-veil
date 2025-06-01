'use client'
import React, { useActionState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { createGame } from '@/actions'
import { Banner, Button, Heading, Icon, InputGroup, Modal } from '@/components'
import { ROUTES } from '@/constants'
import { useModalDialogToggle } from '@/hooks'
import { withCallbacks } from '@/utils'

import { NewGameModalToggle } from './toggle'

export function NewGameModal() {
  const ref = useRef<HTMLDialogElement>(null)
  const router = useRouter()
  const [state = { status: 'idle' }, action, creating] = useActionState(
    withCallbacks(createGame, {
      onSuccess({ game, isMultiStatus }) {
        router.push(
          `${ROUTES.adminEditGame((game as Game).slug)}${isMultiStatus ? '?multi-status=true' : ''}`,
        )
        toast.success(`${(game as Game).name} created successfully!`)
      },
    }),
    { status: 'idle' },
  )
  const toggleModal = useModalDialogToggle(ref)

  return (
    <Modal Toggle={NewGameModalToggle} id="new-game" ref={ref}>
      <form action={action} className="min-w-[50vw]">
        <header className="bg-primary-50 border-b border-neutral-100 p-4">
          <Heading
            as="h2"
            className="flex items-center gap-1 text-neutral-900"
            classNameOverrides={{
              fontSize: 'text-heading-md',
              fontWeight: 'font-semibold',
            }}
          >
            New Game{' '}
            <Icon
              className="text-heading-lg text-primary-900"
              icon="videogame"
            />
          </Heading>
        </header>
        <div className="p-4">
          {state.message && !creating ? (
            <Banner className="mb-6" message={state.message} />
          ) : null}
          <InputGroup
            className="mb-4 sm:max-w-[50%]"
            id="igdb-id"
            inputProps={{
              autoComplete: 'off',
              autoFocus: true,
              defaultValue: state.igdbId,
              name: 'igdb-id',
              type: 'number',
            }}
            label="IGDB ID"
            required
          />
          <div className="flex justify-end gap-2">
            <Button
              onClick={toggleModal}
              size="sm"
              text="Cancel"
              theme="neutral"
              variant="outline"
            />
            <Button loading={creating} size="sm" type="submit">
              Generate
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
