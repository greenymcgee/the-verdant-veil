import React, { ElementType, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType
}

export function Card({
  as: As = 'article',
  children,
  className,
  ...options
}: Props) {
  return (
    <As
      className={twMerge(
        'rounded-lg border-1 border-neutral-100 bg-white p-3 shadow-card-dark',
        className,
      )}
      {...options}
    >
      {children}
    </As>
  )
}
