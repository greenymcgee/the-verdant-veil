import React, { LabelHTMLAttributes } from 'react'
import clsx from 'clsx'

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
      className={clsx('cursor-pointer text-b-s font-semibold', className)}
      {...options}
    >
      {children}{' '}
      {required ? (
        <span
          aria-hidden
          className="text-danger-500"
          data-testid="label-required-star"
        >
          *
        </span>
      ) : null}
    </label>
  )
}
