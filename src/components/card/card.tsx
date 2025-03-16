import React, { ElementType, HTMLAttributes } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  shadowTheme?: 'light' | 'dark'
}

export function Card({
  as: As = 'article',
  children,
  className,
  shadowTheme = 'dark',
  ...options
}: Props) {
  return (
    <As
      className={twMerge(
        clsx('rounded-lg bg-white p-3', {
          'shadow-card-dark border-1 border-neutral-100':
            shadowTheme === 'dark',
          'shadow-card-light': shadowTheme === 'light',
        }),
        className,
      )}
      {...options}
    >
      {children}
    </As>
  )
}
