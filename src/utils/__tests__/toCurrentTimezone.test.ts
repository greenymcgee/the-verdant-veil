import { toZonedTime } from 'date-fns-tz'

import { toCurrentTimezone } from '..'

describe('toCurrentTimezone', () => {
  it('should do nothing when date is blank', () => {
    const result = toCurrentTimezone(null)
    expect(result).toBe('')
  })

  it('should convert the date to the current timezone from UTC', () => {
    const date = '2025-02-27T06:54'
    const result = toCurrentTimezone(date)
    expect(result).toEqual(
      toZonedTime(date, Intl.DateTimeFormat().resolvedOptions().timeZone),
    )
  })
})
