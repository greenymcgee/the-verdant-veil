import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

interface Props extends HTMLAttributes<HTMLLIElement> {
  isLoading: boolean
  isValidating: boolean
}

export function GlobalSearchbarMessage({
  children,
  className,
  isLoading,
  isValidating,
  ...options
}: Props) {
  return (
    <li
      className={clsx('flex px-3 py-2 text-neutral-500 shadow-sm', className)}
      data-testid="global-searchbar-empty message"
      {...options}
    >
      <span className={clsx({ skeleton: isLoading || isValidating })}>
        {children}
      </span>
    </li>
  )
}
