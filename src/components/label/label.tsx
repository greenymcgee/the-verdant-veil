import React, { LabelHTMLAttributes } from 'react'
import clsx from 'clsx'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  classNameOverrides?: { cursor?: string }
  required?: boolean
}

export function Label({
  children,
  className,
  classNameOverrides,
  required,
  ...options
}: LabelProps) {
  return (
    <label
      className={clsx(
        'text-body-sm font-semibold',
        { 'cursor-pointer': !classNameOverrides?.cursor },
        classNameOverrides?.cursor,
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
