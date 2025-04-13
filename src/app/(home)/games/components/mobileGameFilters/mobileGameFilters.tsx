'use client'
import React, { RefObject, SyntheticEvent, useRef } from 'react'

import { Button, Icon, Modal } from '@/components'
import { useModalDialogToggle } from '@/hooks'

import { GameFiltersGroup } from '../gameFiltersGroup'

type GroupProps = Omit<PropsOf<typeof GameFiltersGroup>, 'inputIdPrefix'>

interface Props extends GroupProps {
  filtersPresent: boolean
  loading: boolean
  onClearClicked: VoidFunction
  onSubmit(event: SyntheticEvent<HTMLFormElement>): void
  ref: RefObject<HTMLFormElement | null>
  validating: boolean
}

export function MobileGameFilters({
  companies,
  filtersPresent,
  genres,
  loading,
  onClearClicked,
  onSubmit,
  platforms,
  ref,
  validating,
}: Props) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const toggleModal = useModalDialogToggle(modalRef)

  return (
    <form
      className="mb-6 flex justify-end lg:hidden"
      data-testid="mobile-game-filters"
      onSubmit={onSubmit}
      ref={ref}
    >
      {filtersPresent ? (
        <Button
          className="mr-2"
          data-testid="mobile-clear-filters-button"
          onClick={onClearClicked}
          rightIcon="close"
          size="xs"
          text="Clear filters"
          theme="secondary"
        />
      ) : null}
      <Modal
        Toggle={(props) => (
          <Button
            data-testid="mobile-filter-button"
            loading={loading}
            rightIcon="filter-alt"
            size="sm"
            {...props}
          >
            Filter
          </Button>
        )}
        id="filter-games"
        ref={modalRef}
      >
        <div className="bg-primary-50 px-1 py-3">
          <h2 className="mb-2 flex justify-between px-2 font-medium">
            Filter{' '}
            <Icon className="text-secondary-900 inline" icon="filter-alt" />
          </h2>
          <div className="h-[50vh] w-[85vw] overflow-y-auto sm:w-[50vw]">
            <GameFiltersGroup
              companies={companies}
              genres={genres}
              inputIdPrefix="mobile"
              platforms={platforms}
              validating={validating}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 px-1 py-2">
          <Button
            onClick={toggleModal}
            text="Cancel"
            theme="neutral"
            variant="outline"
          />
          <Button
            data-testid="mobile-apply-filters-button"
            onClick={toggleModal}
            text="Apply"
            type="submit"
          />
        </div>
      </Modal>
    </form>
  )
}
