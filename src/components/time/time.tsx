import React, { HTMLAttributes, useMemo } from 'react'
import { format as formatMethod } from 'date-fns'

import { toCurrentTimezone } from '@/utils'

interface Props extends Omit<HTMLAttributes<HTMLTimeElement>, 'dateTime'> {
  convertedToLocalTimezone?: boolean
  date: string | undefined | null
  format: string
}

export function Time({
  convertedToLocalTimezone = true,
  date,
  format,
  ...options
}: Props) {
  const converted = useMemo(() => {
    if (!date) return date

    if (convertedToLocalTimezone) return toCurrentTimezone(date)

    return new Date(date)
  }, [convertedToLocalTimezone, date])

  if (!converted) return null

  return (
    <time dateTime={formatMethod(converted, 'yyyy-MM-dd:hh:mm')} {...options}>
      {formatMethod(converted, format)}
    </time>
  )
}
