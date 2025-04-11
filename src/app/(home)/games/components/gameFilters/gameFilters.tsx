'use client'
import React, { SyntheticEvent, useCallback, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useGetGameFiltersQuery } from '@/hooks/api'

import {
  convertFiltersToParams,
  filtersPresent as filtersPresentMethod,
  getParamsWithoutFilters,
} from '../../utils'
import { DesktopGameFilters } from '../desktopGameFilters'
import { MobileGameFilters } from '../mobileGameFilters'

export function GameFilters() {
  const { push } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)
  const filtersPresent = filtersPresentMethod(searchParams)
  const {
    filters: { companies, genres, platforms },
    isLoading,
    isValidating,
  } = useGetGameFiltersQuery()
  const loading = Boolean(
    isLoading && !companies.length && !genres.length && !platforms.length,
  )
  const pushToSearchResults = useCallback(
    (query: string) => push(`${pathname}?${query}`),
    [pathname, push],
  )

  const handleSubmit = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault()
      const query = convertFiltersToParams(
        event,
        new URLSearchParams(searchParams),
      )
      pushToSearchResults(query)
    },
    [pushToSearchResults, searchParams],
  )

  const handleClearClicked = useCallback(() => {
    const params = getParamsWithoutFilters(new URLSearchParams(searchParams))
    pushToSearchResults(params)
    formRef.current?.reset()
  }, [pushToSearchResults, searchParams])

  return (
    <>
      <MobileGameFilters
        companies={companies}
        filtersPresent={filtersPresent}
        genres={genres}
        loading={loading}
        onClearClicked={handleClearClicked}
        onSubmit={handleSubmit}
        platforms={platforms}
        ref={formRef}
        validating={isValidating}
      />
      <DesktopGameFilters
        companies={companies}
        filtersPresent={filtersPresent}
        genres={genres}
        loading={loading}
        onClearClicked={handleClearClicked}
        onSubmit={handleSubmit}
        platforms={platforms}
        ref={formRef}
        validating={isValidating}
      />
    </>
  )
}
