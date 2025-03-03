import { fromZonedTime } from 'date-fns-tz'

export function fromCurrentTimezone(
  date: FirstParameterOf<typeof fromZonedTime>,
) {
  return fromZonedTime(date, Intl.DateTimeFormat().resolvedOptions().timeZone)
}
