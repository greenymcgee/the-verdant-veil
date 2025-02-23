import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

interface Props extends HTMLAttributes<HTMLTableCellElement> {
  text?: string
}

export function Td({ children, className, text, ...options }: Props) {
  return (
    <td className={clsx('px-4 py-3', className)} {...options}>
      {children ?? text}
    </td>
  )
}
