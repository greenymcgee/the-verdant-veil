import React, { ElementType, HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  as?: ElementType
  message?: ReactNode
}

export function Banner({
  as: As = 'p',
  children,
  className,
  message,
  ...options
}: Props) {
  return (
    <As
      className={clsx('bg-danger-800 rounded-sm p-3 text-white', className)}
      role="alert"
      {...options}
    >
      {message ? <strong>{message}</strong> : children}
    </As>
  )
}
