import { toZonedTime } from 'date-fns-tz'

export function toCurrentTimezone(
  date: FirstParameterOf<typeof toZonedTime> | null | undefined,
) {
  if (!date) return ''

  return toZonedTime(date, Intl.DateTimeFormat().resolvedOptions().timeZone)
}
