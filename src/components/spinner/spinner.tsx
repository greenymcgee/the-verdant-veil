import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

import { SPINNER_SIZES } from './constants'

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  classNameOverrides?: { display?: string }
  size?: keyof typeof SPINNER_SIZES
  theme?: StyleTheme
}

export function Spinner({
  className,
  classNameOverrides,
  size = 'md',
  theme = 'primary',
  ...options
}: SpinnerProps) {
  return (
    <div
      className={clsx(
        { 'flex items-center justify-center': !classNameOverrides?.display },
        classNameOverrides?.display,
        className,
      )}
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
