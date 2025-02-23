import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

interface Props extends HTMLAttributes<HTMLTableCellElement> {
  text?: string
}

export function Th({ children, className, text, ...options }: Props) {
  return (
    <th className={clsx('px-4 py-3 whitespace-nowrap', className)} {...options}>
      {text ?? children}
    </th>
  )
}
