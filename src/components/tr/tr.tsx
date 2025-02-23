import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

export function Tr({
  children,
  className,
  ...options
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={clsx(
        'border-b-primary-400 border-b-1 last:border-b-0 even:bg-neutral-50/30',
        className,
      )}
      {...options}
    >
      {children}
    </tr>
  )
}
