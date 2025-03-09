import { format } from 'date-fns'

export function formatDatetimeInputValue(
  date: FirstParameterOf<typeof format>,
) {
  return format(date, "yyyy-MM-dd'T'HH:mm")
}
