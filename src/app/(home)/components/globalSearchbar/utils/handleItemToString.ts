import { SEE_ALL_RESULTS_ITEM } from '../../../constants'

export function handleItemToString(query: string) {
  return (game: GameWithLimitedResources | null) => {
    if (!game) return ''

    if (game.name === SEE_ALL_RESULTS_ITEM.name) return query

    return game.name
  }
}
