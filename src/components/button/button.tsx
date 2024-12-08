/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

import {
  BUTTON_SIZES,
  BUTTON_THEMES,
  DEFAULT_BUTTON_CLASS_NAMES,
} from './constants'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'
  theme?: StyleTheme
  variant?: ButtonVariant
}

export function Button({
  children,
  size = 'md',
  theme = 'primary',
  variant = 'solid',
  type = 'button',
}: ButtonProps) {
  return (
    <button
      className={clsx(
        BUTTON_THEMES[variant][theme],
        BUTTON_SIZES[size],
        DEFAULT_BUTTON_CLASS_NAMES,
      )}
      type={type}
    >
      {children}
    </button>
  )
}

/* eslint-enable react/button-has-type */
