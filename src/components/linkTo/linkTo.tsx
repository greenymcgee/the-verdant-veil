import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import {
  BUTTON_SIZES,
  BUTTON_THEMES,
  DEFAULT_BUTTON_CLASS_NAMES,
} from '@/constants'

import { Icon } from '../icon'
import { BASE_LINK_TO_CLASSNAME, LINK_TO_THEME_MAP } from './constants'

interface LinkToProps extends PropsOf<typeof Link> {
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
      className={twMerge(
        clsx({
          [BASE_LINK_TO_CLASSNAME]: !variant,
          [LINK_TO_THEME_MAP[theme]]: !variant,
          [DEFAULT_BUTTON_CLASS_NAMES]: variant,
          [buttonTheme]: variant,
          [BUTTON_SIZES[size]]: variant,
        }),
        className,
      )}
      rel={opensNewTab ? 'noopener noreferrer' : undefined}
      target={opensNewTab ? '_blank' : undefined}
      {...options}
    >
      {leftIcon ? <Icon className="mt-[2%]" icon={leftIcon} /> : null}
      {text ?? children}
      {rightIcon ? <Icon className="mt-[2%]" icon={rightIcon} /> : null}
    </Link>
  )
}
