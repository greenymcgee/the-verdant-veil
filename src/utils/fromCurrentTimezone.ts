import { fromZonedTime } from 'date-fns-tz'

import { logger } from '@/modules'

export function fromCurrentTimezone(
  date: FirstParameterOf<typeof fromZonedTime>,
) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const formatted = fromZonedTime(date, timezone)
  logger.info(`fromCurrentTimezone INPUTTED DATE ${timezone}:${date}`)
  logger.info(`fromCurrentTimezone UTC CONVERSION:${formatted.toISOString()}`)
  return formatted
}
