import { fromZonedTime } from 'date-fns-tz'

import { fromCurrentTimezone } from '..'

describe('fromCurrentTimezone', () => {
  it('should convert the date to the current timezone from UTC', () => {
    const date = '2025-02-27T06:54'
    const result = fromCurrentTimezone(date)
    expect(result).toEqual(
      fromZonedTime(date, Intl.DateTimeFormat().resolvedOptions().timeZone),
    )
  })
})
