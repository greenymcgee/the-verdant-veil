import React, { RefObject, SubmitEvent } from 'react'

import { Button, Card, Spinner } from '@/components'

import { GameFiltersGroup } from '../gameFiltersGroup'

type GroupProps = Omit<PropsOf<typeof GameFiltersGroup>, 'inputIdPrefix'>

interface Props extends GroupProps {
  filtersPresent: boolean
  loading: boolean
  onClearClicked: VoidFunction
  onSubmit(event: SubmitEvent<HTMLFormElement>): void
  ref: RefObject<HTMLFormElement | null>
  validating: boolean
}

export function DesktopGameFilters({
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
  return (
    <Card
      as="form"
      className="col-span-3 hidden lg:block"
      classNameOverrides={{
        backgroundColor: 'bg-primary-50',
        padding: 'py-3 px-1',
      }}
      data-testid="desktop-game-filters"
      id="desktop-game-filters"
      onSubmit={onSubmit}
      ref={ref}
    >
      <h2 className="mb-2 flex items-center justify-between px-2 font-medium">
        Filter{' '}
        <div className="text-body-xs">
          {filtersPresent ? (
            <Button
              className="mr-2"
              data-testid="desktop-clear-filters-button"
              onClick={onClearClicked}
              rightIcon="close"
              size="xs"
              text="Clear"
              theme="secondary"
            />
          ) : null}
          <Button
            data-testid="desktop-apply-filters-button"
            rightIcon="filter-alt"
            size="xs"
            text="Apply"
            type="submit"
          />
        </div>
      </h2>
      <div className="max-h-[calc(100vh-21rem)] overflow-auto">
        {loading ? (
          <Spinner className="rounded-lg bg-white p-2" size="sm" />
        ) : (
          <GameFiltersGroup
            companies={companies}
            genres={genres}
            inputIdPrefix="desktop"
            platforms={platforms}
            validating={validating}
          />
        )}
      </div>
    </Card>
  )
}
