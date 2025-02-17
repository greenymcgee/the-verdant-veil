import React, { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  message: string
}

export function Banner({ className, message, ...options }: Props) {
  return (
    <p
      className={twMerge('rounded-sm bg-danger-800 p-3 text-white', className)}
      role="alert"
      {...options}
    >
      <strong>{message}</strong>
    </p>
  )
}
