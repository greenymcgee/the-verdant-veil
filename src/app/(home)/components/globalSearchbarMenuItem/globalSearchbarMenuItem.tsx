import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

import { TRANSITION_STYLES } from '@/constants'

import { SEE_ALL_RESULTS_ITEM } from '../../constants'

interface Props extends HTMLAttributes<HTMLLIElement> {
  highlighted: boolean
  isLoading: boolean
  isValidating: boolean
  selectedGame: GameWithLimitedResources | null
}

export function GlobalSearchbarMenuItem({
  children,
  className,
  highlighted,
  isLoading,
  isValidating,
  selectedGame,
  ...itemProps
}: Props) {
  return (
    <li
      className={clsx(
        className,
        'cursor-pointer px-3 py-2 shadow-sm transition-colors',
        TRANSITION_STYLES.inputHover,
        {
          'bg-secondary-800 text-white': highlighted,
          'font-bold': selectedGame?.name === SEE_ALL_RESULTS_ITEM.name,
          skeleton: isLoading || isValidating,
        },
      )}
      data-testid="searchbar-see-all-link"
      {...itemProps}
    >
      {children}
    </li>
  )
}
