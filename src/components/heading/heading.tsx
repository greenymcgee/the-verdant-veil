import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { HEADING_CLASSNAME_MAP } from './constants'

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  as?: keyof typeof HEADING_CLASSNAME_MAP
}

export function Heading({
  as: As = 'h1',
  children,
  className,
  ...options
}: Props) {
  return (
    <As
      className={twMerge(
        clsx('leading-heading font-bold', HEADING_CLASSNAME_MAP[As]),
        className,
      )}
      {...options}
    >
      {children}
    </As>
  )
}
