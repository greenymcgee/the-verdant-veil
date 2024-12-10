import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { BASE_LINK_TO_CLASSNAME, LINK_TO_THEME_MAP } from './constants'

interface LinkToProps extends PropsOf<typeof Link> {
  opensNewTab?: boolean
  theme?: StyleTheme
}

export function LinkTo({
  children,
  className,
  opensNewTab,
  theme = 'primary',
  ...options
}: LinkToProps) {
  return (
    <Link
      className={clsx(
        BASE_LINK_TO_CLASSNAME,
        LINK_TO_THEME_MAP[theme],
        className,
      )}
      rel={opensNewTab ? 'noopener noreferrer' : undefined}
      target={opensNewTab ? '_blank' : undefined}
      {...options}
    >
      {children}
    </Link>
  )
}
