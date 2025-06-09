'use client'
import React, { ChangeEvent, KeyboardEvent, useCallback, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { searchQueryFacade } from '@/facades'

import { Searchbar } from '../searchbar'

interface Props extends PropsOf<typeof Searchbar> {
  autoSearch?: boolean
  pathnameOverride?: string
}

export function IndexSearchbarClientComponent({
  autoSearch,
  pathnameOverride,
  ...options
}: Props) {
  const searchParams = useSearchParams()
  const currentPathname = usePathname()
  const { push } = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const pathname = pathnameOverride ?? currentPathname
  const query = searchParams.get('query') ?? undefined
  const { clearButtonProps, inputProps } = options
  const queryPresent = Boolean(query)

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
    const params = new URLSearchParams(searchParams)
    params.delete('query')
    push(`${pathname}${params.size ? '?' : ''}${params}`)
    const input = inputRef.current as HTMLInputElement
    input.value = ''
  }, [searchParams, push, pathname])

  return (
    <Searchbar
      clearButtonProps={{ onClick: clearSearch, ...clearButtonProps }}
      inputProps={{
        autoFocus: queryPresent,
        defaultValue: query,
        onChange: autoSearch ? handleSearchChange : undefined,
        onKeyUp: handleSearchKeyUp,
        ref: inputRef,
        ...inputProps,
      }}
      showingClearButton={queryPresent}
      {...options}
    />
  )
}
