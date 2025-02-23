import React, { HTMLAttributes, ReactElement } from 'react'
import clsx from 'clsx'

interface Props extends HTMLAttributes<HTMLDivElement> {
  header: ReactElement
}

export function Table({ children, className, header, ...options }: Props) {
  return (
    <div className={clsx('overflow-x-auto', className)} {...options}>
      <table className="w-full min-w-124 text-left" data-testid="games">
        <thead className="font-semibold">
          <tr className="border-primary-400 border-b-1 text-neutral-800">
            {header}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
