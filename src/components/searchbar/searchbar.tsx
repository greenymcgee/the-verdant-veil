'use client'
import React, { ChangeEvent, HTMLAttributes, useCallback, useRef } from 'react'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { ROUTES } from '@/constants'
import { searchQueryFacade } from '@/facades'

import { Icon } from '../icon'
import { Input } from '../input'

interface SearchbarProps extends HTMLAttributes<HTMLDivElement> {
  inputProps?: Omit<PropsOf<typeof Input>, 'onChange' | 'ref' | 'id'>
  route: 'adminGames'
}

export function Searchbar({
  className,
  id = 'searchbar',
  inputProps,
  route,
  ...options
}: SearchbarProps) {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const debounced = useDebouncedCallback((query: string) => {
    searchQueryFacade.update(query, new URLSearchParams(searchParams))
    push(`${ROUTES[route]}?${searchQueryFacade.updatedParams}`)
  }, 600)

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => debounced(event.target.value),
    [debounced],
  )

  const clearSearch = useCallback(() => {
    push(ROUTES[route])
    const input = inputRef.current as HTMLInputElement
    input.value = ''
  }, [push, route])

  return (
    <div className={clsx('relative', className)} {...options}>
      <label
        aria-label="Search by Name"
        className={clsx(
          'absolute top-1/2 left-2 -translate-y-1/2 transform cursor-pointer',
          'text-heading-md text-neutral-500',
        )}
        htmlFor={id}
      >
        <Icon icon="magnify" />
      </label>
      <Input
        className={clsx('px-8', inputProps?.className)}
        data-testid={id}
        id={id}
        onChange={handleSearchChange}
        placeholder="Search"
        ref={inputRef}
        {...inputProps}
      />
      <button
        aria-label="Clear Search"
        className={clsx(
          'absolute top-[10px] right-2 cursor-pointer text-2xl',
          'text-neutral-500 hover:opacity-70',
        )}
        onClick={clearSearch}
        type="button"
      >
        <Icon icon="close" />
      </button>
    </div>
  )
}
