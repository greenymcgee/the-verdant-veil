import React, { LabelHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function Label({
  children,
  className,
  required,
  ...options
}: LabelProps) {
  return (
    <label
      className={twMerge(
        'cursor-pointer text-body-sm font-semibold',
        className,
      )}
      {...options}
    >
      {children}{' '}
      {required ? (
        <span
          aria-label="required"
          className="text-danger-500"
          data-testid="label-required-star"
        >
          *
        </span>
      ) : null}
    </label>
  )
}
