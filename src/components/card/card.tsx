import React, { ElementType, HTMLAttributes } from 'react'
import clsx from 'clsx'

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  classNameOverrides?: {
    backgroundColor?: string
    borderRadius?: string
    padding?: string
  }
  shadowTheme?: 'light' | 'dark'
  variant?: 'tabpanel'
}

export function Card({
  as: As = 'article',
  children,
  className,
  classNameOverrides,
  shadowTheme = 'dark',
  variant,
  ...options
}: Props) {
  return (
    <As
      className={clsx(
        {
          'bg-white': !classNameOverrides?.backgroundColor,
          'rounded-b-sm p-6 sm:rounded-tr-sm': variant === 'tabpanel',
          'shadow-card-dark border-1 border-neutral-100':
            shadowTheme === 'dark',
          'shadow-card-light': shadowTheme === 'light',
        },
        {
          'p-3': !classNameOverrides?.padding && !variant,
          'rounded-lg': !classNameOverrides?.borderRadius && !variant,
        },
        classNameOverrides?.backgroundColor,
        classNameOverrides?.borderRadius,
        classNameOverrides?.padding,
        className,
      )}
      {...options}
    >
      {children}
    </As>
  )
}
