'use client'
import React, {
  ChangeEvent,
  HTMLAttributes,
  KeyboardEvent,
  useCallback,
  useRef,
} from 'react'
import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { searchQueryFacade } from '@/facades'

import { Icon } from '../icon'
import { Input } from '../input'

interface Props extends HTMLAttributes<HTMLDivElement> {
  autoSearch?: boolean
  inputProps?: Omit<PropsOf<typeof Input>, 'onChange' | 'ref' | 'id'>
  labelProps?: Omit<HTMLAttributes<HTMLLabelElement>, 'htmlFor'> & {
    ariaLabel?: string
  }
  pathnameOverride?: string
}

export function SearchbarClientComponent({
  autoSearch,
  className,
  id = 'searchbar',
  inputProps = {},
  labelProps = { ariaLabel: 'Search by Name' },
  pathnameOverride,
  ...options
}: Props) {
  const searchParams = useSearchParams()
  const currentPathname = usePathname()
  const { push } = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const pathname = pathnameOverride ?? currentPathname
  const query = searchParams.get('query') ?? undefined
  const {
    ariaLabel = 'Search by Name',
    className: labelClassName,
    ...labelOptions
  } = labelProps
  const { className: inputClassName, ...inputOptions } = inputProps

  const pushToSearchResults = useCallback(
    (query: string) => {
      searchQueryFacade.update(query, new URLSearchParams(searchParams))
      push(`${pathname}?${searchQueryFacade.updatedParams}`)
    },
    [pathname, push, searchParams],
  )

  const debounced = useDebouncedCallback((query: string) => {
    pushToSearchResults(query)
  }, 1000)

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => debounced(event.target.value),
    [debounced],
  )

  const handleSearchKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return

      pushToSearchResults(event.currentTarget.value)
    },
    [pushToSearchResults],
  )

  const clearSearch = useCallback(() => {
    push(pathname)
    const input = inputRef.current as HTMLInputElement
    input.value = ''
  }, [push, pathname])

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
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={Boolean(query)}
        className={clsx('px-8', inputClassName)}
        data-testid={id}
        defaultValue={query}
        id={id}
        onChange={autoSearch ? handleSearchChange : undefined}
        onKeyUp={handleSearchKeyUp}
        placeholder="Search"
        ref={inputRef}
        {...inputOptions}
      />
      {query ? (
        <button
          aria-label="Clear Search"
          className={clsx(
            'absolute top-[9px] right-2 cursor-pointer text-2xl',
            'text-neutral-500 hover:opacity-70',
          )}
          onClick={clearSearch}
          type="button"
        >
          <Icon icon="close" />
        </button>
      ) : null}
    </div>
  )
}
