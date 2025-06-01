import { logger } from '@/lib'

export function isValidJson(json: string) {
  try {
    JSON.parse(json)
    return true
  } catch (error) {
    logger.error(error)
    return false
  }
}
