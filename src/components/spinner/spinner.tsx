import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

import { SPINNER_SIZES } from './constants'

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof SPINNER_SIZES
  theme?: StyleTheme
}

export function Spinner({
  size = 'md',
  theme = 'primary',
  ...options
}: SpinnerProps) {
  return (
    <div
      aria-label="Loading"
      className={clsx('spinner', theme, SPINNER_SIZES[size])}
      role="alert"
      {...options}
    />
  )
}
