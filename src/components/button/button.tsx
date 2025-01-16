/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

import {
  BUTTON_SIZES,
  BUTTON_THEMES,
  DEFAULT_BUTTON_CLASS_NAMES,
} from './constants'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof BUTTON_SIZES
  theme?: StyleTheme
  variant?: ButtonVariant
}

export function Button({
  children,
  className,
  size = 'md',
  theme = 'primary',
  variant = 'solid',
  type = 'button',
  ...options
}: ButtonProps) {
  return (
    <button
      className={clsx(
        BUTTON_THEMES[variant][theme],
        BUTTON_SIZES[size],
        DEFAULT_BUTTON_CLASS_NAMES,
        className,
      )}
      type={type}
      {...options}
    >
      {children}
    </button>
  )
}

/* eslint-enable react/button-has-type */
