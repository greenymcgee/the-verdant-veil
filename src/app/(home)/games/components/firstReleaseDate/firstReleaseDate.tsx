import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'
import { format } from 'date-fns'

import { toCurrentTimezone } from '@/utils'

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  firstReleaseDate: IndexGame['firstReleaseDate']
}

export function FirstReleaseDate({
  className,
  firstReleaseDate,
  ...options
}: Props) {
  if (!firstReleaseDate) return null

  return (
    <p
      className={clsx('text-body-sm text-neutral-500', className)}
      {...options}
    >
      {format(toCurrentTimezone(firstReleaseDate), 'MMMM do, yyyy')}
    </p>
  )
}
