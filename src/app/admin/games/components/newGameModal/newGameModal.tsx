'use client'
import React, { useActionState, useRef } from 'react'

import { createGame } from '@/actions'
import { Banner, Button, Icon, InputGroup, Modal } from '@/components'
import { toggleModalDialog } from '@/utils'

import { NewGameModalToggle } from './toggle'

export function NewGameModal() {
  const ref = useRef<HTMLDialogElement>(null)
  const [state = {}, action, creating] = useActionState(createGame, {})
  const toggleModal = () => toggleModalDialog(ref.current)

  return (
    <Modal Toggle={NewGameModalToggle} id="new-game" ref={ref}>
      <form action={action} className="min-w-[50vw]">
        <header className="border-b border-neutral-100 bg-primary-50 p-4">
          <h2 className="flex items-center gap-1 text-heading-md font-semibold text-neutral-700">
            New Game{' '}
            <Icon
              className="mt-[5px] text-heading-lg text-primary-900"
              icon="videogame"
            />
          </h2>
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
