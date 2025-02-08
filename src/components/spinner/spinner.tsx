import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { SPINNER_SIZES } from './constants'

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof SPINNER_SIZES
  theme?: StyleTheme
}

export function Spinner({
  className,
  size = 'md',
  theme = 'primary',
  ...options
}: SpinnerProps) {
  return (
    <div
      className={twMerge('flex items-center justify-center', className)}
      {...options}
    >
      <div
        aria-label="Loading"
        className={clsx('spinner', theme, SPINNER_SIZES[size])}
        role="alert"
      />
    </div>
  )
}
