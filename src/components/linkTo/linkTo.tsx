import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import {
  BUTTON_SIZES,
  BUTTON_THEMES,
  DEFAULT_BUTTON_CLASS_NAMES,
} from '@/constants'

import { BASE_LINK_TO_CLASSNAME, LINK_TO_THEME_MAP } from './constants'

interface LinkToProps extends PropsOf<typeof Link> {
  opensNewTab?: boolean
  size?: keyof typeof BUTTON_SIZES
  theme?: StyleTheme
  variant?: ButtonVariant
}

export function LinkTo({
  children,
  className,
  opensNewTab,
  size = 'md',
  theme = 'primary',
  variant,
  ...options
}: LinkToProps) {
  const buttonTheme = variant ? BUTTON_THEMES[variant][theme] : ''
  return (
    <Link
      className={clsx(
        {
          [BASE_LINK_TO_CLASSNAME]: !variant,
          [LINK_TO_THEME_MAP[theme]]: !variant,
          [DEFAULT_BUTTON_CLASS_NAMES]: variant,
          [buttonTheme]: variant,
          [BUTTON_SIZES[size]]: variant,
        },
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
