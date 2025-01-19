import React, { HTMLAttributes } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import clsx from 'clsx'

import { Input } from '../input'

interface SearchbarProps extends HTMLAttributes<HTMLDivElement> {
  inputProps?: PropsOf<typeof Input>
}

export function Searchbar({
  className,
  id = 'searchbar',
  inputProps,
  ...options
}: SearchbarProps) {
  return (
    <div className={clsx('relative', className)} {...options}>
      <label
        aria-label="Search by Name"
        className={clsx(
          'absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer',
          'text-heading-md text-neutral-500',
        )}
        htmlFor={id}
      >
        <Icon icon="mdi:magnify" />
      </label>
      <Input
        className="pl-8"
        data-testid={id}
        id={id}
        placeholder="Search"
        {...inputProps}
      />
    </div>
  )
}
