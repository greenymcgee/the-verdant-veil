import { API_ROUTES, GREEN_QUEST_API_URL } from '@/constants'

type RouteKey = keyof typeof API_ROUTES

export function getApiUrl(key: RouteKey) {
  return `${GREEN_QUEST_API_URL}${API_ROUTES[key]}`
}
