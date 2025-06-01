import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import {
  BASE_LINK_TO_CLASSNAME,
  BUTTON_SIZES,
  BUTTON_THEMES,
  DEFAULT_BUTTON_CLASS_NAMES,
  DEFAULT_BUTTON_DISPLAY_CLASS_NAMES,
  LINK_TO_THEME_MAP,
} from '@/constants'

import { Icon } from '../icon'

interface LinkToProps extends PropsOf<typeof Link> {
  classNameOverrides?: { display?: string }
  leftIcon?: IconType
  opensNewTab?: boolean
  rightIcon?: IconType
  size?: keyof typeof BUTTON_SIZES
  text?: string
  theme?: StyleTheme
  variant?: ButtonVariant
}

export function LinkTo({
  children,
  className,
  classNameOverrides,
  leftIcon,
  opensNewTab,
  rightIcon,
  size = 'md',
  text,
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
          [DEFAULT_BUTTON_DISPLAY_CLASS_NAMES]: !classNameOverrides?.display,
          [buttonTheme]: variant,
          [BUTTON_SIZES[size]]: variant,
          rounded: !variant,
        },
        classNameOverrides?.display,
        className,
      )}
      rel={opensNewTab ? 'noopener noreferrer' : undefined}
      target={opensNewTab ? '_blank' : undefined}
      {...options}
    >
      {leftIcon ? <Icon icon={leftIcon} /> : null}
      {text ?? children}
      {rightIcon ? <Icon icon={rightIcon} /> : null}
    </Link>
  )
}
