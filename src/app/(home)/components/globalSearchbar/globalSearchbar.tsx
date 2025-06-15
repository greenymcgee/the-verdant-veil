import React, { KeyboardEvent, useCallback, useState } from 'react'
import clsx from 'clsx'
import { useCombobox } from 'downshift'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { Searchbar, Time } from '@/components'
import { ROUTES } from '@/constants'
import { useSearchGamesQuery } from '@/hooks/api'

import { SEE_ALL_RESULTS_ITEM } from '../../constants'
import { GlobalSearchbarMenuItem } from '../globalSearchbarMenuItem'
import { GlobalSearchbarMessage } from '../globalSearchbarMessage'
import {
  handleInputValueChange,
  handleItemToString,
  handleSelectedItemChange,
} from './utils'

interface Props {
  autoFocus?: boolean
  className?: string
}

export function GlobalSearchbar({ autoFocus = false, className }: Props) {
  const [query, setQuery] = useState('')
  const { games, isLoading, isValidating } = useSearchGamesQuery(query)
  const { push } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const debouncedSetQuery = useDebouncedCallback(
    (searchQuery: string) => setQuery(searchQuery),
    500,
  )

  const {
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    reset,
    selectedItem,
  } = useCombobox({
    itemToString: handleItemToString(query),
    items: [...games, SEE_ALL_RESULTS_ITEM],
    onInputValueChange: handleInputValueChange(debouncedSetQuery),
    onSelectedItemChange: handleSelectedItemChange(query, push),
  })

  const clearSearch = useCallback(() => {
    reset()
    setQuery('')
    const params = new URLSearchParams(searchParams)
    params.delete('query')
    push(`${pathname}${params.size ? '?' : ''}${params}`)
  }, [pathname, push, reset, searchParams])

  const handleSearchKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return

      push(`${ROUTES.games}?query=${event.currentTarget.value}`)
    },
    [push],
  )

  return (
    <div className={clsx('group relative', className)}>
      <Searchbar
        clearButtonProps={{ onClick: clearSearch }}
        inputProps={getInputProps({ autoFocus, onKeyUp: handleSearchKeyUp })}
        labelProps={getLabelProps()}
        showingClearButton={Boolean(query)}
      />
      <ul
        className={clsx(
          'text-body-sm absolute z-10 mt-1 hidden max-h-80 w-full min-w-96 overflow-scroll rounded-sm',
          'bg-white p-0 text-neutral-700 shadow-md group-focus-within:block',
        )}
        {...getMenuProps()}
      >
        {query ? null : (
          <GlobalSearchbarMessage
            data-testid="global-searchbar-placeholder"
            isLoading={isLoading}
            isValidating={isValidating}
          >
            Try searching for a game by name
          </GlobalSearchbarMessage>
        )}
        {query && !games.length && !isLoading && !isValidating ? (
          <GlobalSearchbarMessage
            data-testid="global-searchbar-empty message"
            isLoading={isLoading}
            isValidating={isValidating}
          >
            There aren&apos;t any games matching your search
          </GlobalSearchbarMessage>
        ) : null}
        {games.map((game, index) => {
          const highlighted = highlightedIndex === index
          return (
            <GlobalSearchbarMenuItem
              className="flex items-center gap-2"
              data-testid={`searched-game-${game.id}`}
              highlighted={highlighted}
              isLoading={isLoading}
              isValidating={isValidating}
              key={game.id}
              selectedGame={selectedItem}
              {...getItemProps({ index, item: game })}
            >
              <Image
                alt={`${game.name} Cover`}
                height={40}
                src={game.cover.url}
                width={53}
              />
              <div>
                <div className={clsx({ skeleton: isLoading || isValidating })}>
                  {game.name}
                </div>
                <Time
                  className={clsx('text-body-xs', {
                    skeleton: isLoading || isValidating,
                    'text-neutral-500': !highlighted,
                    'text-secondary-50': highlighted,
                  })}
                  date={game.firstReleaseDate}
                  format="yyyy"
                />
              </div>
            </GlobalSearchbarMenuItem>
          )
        })}
        {games.length ? (
          <GlobalSearchbarMenuItem
            className="text-center"
            data-testid="searchbar-see-all-link"
            highlighted={highlightedIndex === games.length}
            isLoading={isLoading}
            isValidating={isValidating}
            selectedGame={selectedItem}
            {...getItemProps({
              index: games.length,
              item: SEE_ALL_RESULTS_ITEM,
            })}
          >
            See all results
          </GlobalSearchbarMenuItem>
        ) : null}
      </ul>
    </div>
  )
}
