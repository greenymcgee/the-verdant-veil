import React, { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

import { BASE_INPUT_CLASSNAMES, INPUT_CLASS_NAMES_MAP } from './constants'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, type = 'text', ...options }: InputProps) {
  return (
    <input
      className={clsx(
        BASE_INPUT_CLASSNAMES,
        INPUT_CLASS_NAMES_MAP[type],
        className,
      )}
      type={type}
      {...options}
    />
  )
}
