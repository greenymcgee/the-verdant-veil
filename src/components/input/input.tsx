import React, { InputHTMLAttributes, RefObject } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { BASE_INPUT_CLASSNAMES, INPUT_CLASS_NAMES_MAP } from './constants'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLInputElement | null>
}

export function Input({
  className,
  required,
  type = 'text',
  ...options
}: InputProps) {
  return (
    <input
      aria-required={required}
      className={clsx(
        BASE_INPUT_CLASSNAMES,
        INPUT_CLASS_NAMES_MAP[type],
        twMerge('w-full', className),
      )}
      required={required}
      type={type}
      {...options}
    />
  )
}
