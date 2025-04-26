import { updateGame } from '@/actions'
import { formatDatetimeInputValue, toCurrentTimezone } from '@/utils'

type State = FirstParameterOf<typeof updateGame>

function getEstimatedFirstPlayedDate(game: Game, state: State) {
  if (state.estimatedFirstPlayedDate) return state.estimatedFirstPlayedDate

  if (game.estimatedFirstPlayedDate) return game.estimatedFirstPlayedDate

  return ''
}

function getLastPlayedDate(game: Game, state: State) {
  if (state.lastPlayedDate) return state.lastPlayedDate

  if (game.lastPlayedDate) return game.lastPlayedDate

  return ''
}

function getPublishedAt(game: Game, state: State) {
  if (!state.publishedAt && !game.publishedAt) return ''

  return formatDatetimeInputValue(
    toCurrentTimezone(state.publishedAt ?? game.publishedAt),
  )
}

export function getFormDates(game: Game, state: State) {
  return {
    estimatedFirstPlayedDate: getEstimatedFirstPlayedDate(game, state),
    lastPlayedDate: getLastPlayedDate(game, state),
    publishedAt: getPublishedAt(game, state),
  }
}
