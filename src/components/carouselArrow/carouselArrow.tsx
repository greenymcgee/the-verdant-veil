import React from 'react'
import clsx from 'clsx'

import { Icon } from '../icon'

interface Props {
  direction: 'left' | 'right'
  disabled: boolean
  onClick: VoidFunction
  sliderLoaded: boolean
}

const ARROW_CLASS_NAME =
  'text-primary-900 shadow-card-dark absolute top-1/2 -mt-4 rounded-full bg-white text-5xl z-10'

export function CarouselArrow({
  direction,
  disabled,
  onClick,
  sliderLoaded,
}: Props) {
  if (!sliderLoaded) return null

  return (
    <button
      aria-label={
        direction === 'left' ? 'Go to previous slide' : 'Go to next slide'
      }
      className={clsx(
        ARROW_CLASS_NAME,
        direction === 'left' ? '-left-4' : '-right-4',
        disabled ? 'cursor-default opacity-70 select-none' : 'cursor-pointer',
      )}
      data-testid={`${direction === 'left' ? 'previous' : 'next'}-slide-button`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Icon icon={direction === 'left' ? 'chevron-left' : 'chevron-right'} />
    </button>
  )
}
