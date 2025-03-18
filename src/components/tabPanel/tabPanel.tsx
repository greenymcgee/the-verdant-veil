import React, { HTMLAttributes, PropsWithChildren } from 'react'
import clsx from 'clsx'

type Attributes = Omit<
  PropsWithChildren<HTMLAttributes<HTMLElement>>,
  'tabIndex' | 'role' | 'id' | 'aria-labelledby'
>

interface Props extends Attributes {
  active: boolean
  hash: string
}

export function TabPanel({
  active,
  children,
  className,
  hash,
  ...options
}: Props) {
  return (
    <article
      aria-labelledby={`${hash}-tab`}
      className={clsx(
        'shadow-card-light rounded-b-sm bg-white p-3 sm:rounded-tr-sm',
        {
          hidden: !active,
        },
        className,
      )}
      data-testid={`${hash}-tabpanel`}
      id={`${hash}-tabpanel`}
      role="tabpanel"
      tabIndex={0}
      {...options}
    >
      {children}
    </article>
  )
}
