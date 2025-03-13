'use client'
import React, { useActionState, useRef } from 'react'

import { createGame } from '@/actions'
import { Banner, Button, Heading, Icon, InputGroup, Modal } from '@/components'
import { useModalDialogToggle } from '@/hooks'

import { NewGameModalToggle } from './toggle'

export function NewGameModal() {
  const ref = useRef<HTMLDialogElement>(null)
  const [state = {}, action, creating] = useActionState(createGame, {})
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
