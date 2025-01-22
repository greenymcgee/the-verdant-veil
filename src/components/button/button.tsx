/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import {
  BUTTON_SIZES,
  BUTTON_THEMES,
  DEFAULT_BUTTON_CLASS_NAMES,
} from '@/constants'

import { Icon } from '../icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: IconType
  rightIcon?: IconType
  size?: keyof typeof BUTTON_SIZES
  text?: string
  theme?: StyleTheme
  variant?: ButtonVariant
}

export function Button({
  children,
  className,
  leftIcon,
  rightIcon,
  size = 'md',
  text,
  theme = 'primary',
  variant = 'solid',
  type = 'button',
  ...options
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          BUTTON_THEMES[variant][theme],
          BUTTON_SIZES[size],
          DEFAULT_BUTTON_CLASS_NAMES,
          className,
        ),
        className,
      )}
      type={type}
      {...options}
    >
      {leftIcon ? <Icon className="mt-[3px]" icon={leftIcon} /> : null}
      {text ?? children}
      {rightIcon ? <Icon className="mt-[3px]" icon={rightIcon} /> : null}
    </button>
  )
}

/* eslint-enable react/button-has-type */
