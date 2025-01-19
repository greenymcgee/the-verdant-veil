/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ROUTES, GREEN_QUEST_API_URL } from '@/constants'

type RouteKey = keyof typeof API_ROUTES
type RouteArgs<
  Key extends RouteKey,
  Value extends (typeof API_ROUTES)[Key],
> = Value extends (...args: any[]) => any ? Parameters<Value> : never

export function getApiUrl<Key extends RouteKey>(
  key: Key,
  args?: RouteArgs<Key, (typeof API_ROUTES)[Key]>,
) {
  if (typeof API_ROUTES[key] === 'function' && Array.isArray(args)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return `${GREEN_QUEST_API_URL}${API_ROUTES[key](...args)}`
  }

  return `${GREEN_QUEST_API_URL}${API_ROUTES[key]}`
}
