import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

import { Icon } from '../icon'
import { Input } from '../input'

interface Props extends HTMLAttributes<HTMLDivElement> {
  clearButtonProps?: HTMLAttributes<HTMLButtonElement>
  inputProps?: Omit<PropsOf<typeof Input>, 'id'>
  labelProps?: Omit<HTMLAttributes<HTMLLabelElement>, 'htmlFor'> & {
    ariaLabel?: string
  }
  showingClearButton?: boolean
}

export function Searchbar({
  className,
  clearButtonProps = {},
  id = 'searchbar',
  inputProps = {},
  labelProps = { ariaLabel: 'Search by Name' },
  showingClearButton,
  ...options
}: Props) {
  const {
    ariaLabel = 'Search by Name',
    className: labelClassName,
    ...labelOptions
  } = labelProps
  const { className: inputClassName, ...inputOptions } = inputProps
  const { className: clearButtonClassName, ...clearButtonOptions } =
    clearButtonProps

  return (
    <div className={clsx('relative', className)} {...options}>
      <label
        aria-label={ariaLabel}
        className={clsx(
          'absolute top-1/2 left-2 -translate-y-1/2 transform cursor-pointer',
          'text-heading-md text-neutral-500',
          labelClassName,
        )}
        htmlFor={id}
        {...labelOptions}
      >
        <Icon icon="magnify" />
      </label>
      <Input
        autoComplete="off"
        className={clsx('px-8', inputClassName)}
        data-testid={id}
        id={id}
        placeholder="Search"
        {...inputOptions}
      />
      {showingClearButton ? (
        <button
          aria-label="Clear Search"
          className={clsx(
            'absolute top-[9px] right-2 cursor-pointer text-2xl',
            'text-neutral-500 hover:opacity-70',
            clearButtonClassName,
          )}
          data-testid="searchbar-clear-button"
          type="button"
          {...clearButtonOptions}
        >
          <Icon icon="close" />
        </button>
      ) : null}
    </div>
  )
}
