import { format } from 'date-fns'

import { formatDatetimeInputValue } from '..'

describe('formatDatetimeInputValue', () => {
  it('should format the date for a datetime-local input', () => {
    const date = new Date()
    const result = formatDatetimeInputValue(date)
    expect(result).toBe(format(date, "yyyy-MM-dd'T'HH:mm"))
  })
})
