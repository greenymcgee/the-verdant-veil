import { gameFactory } from '../factories'

export const SUPER_METROID = gameFactory.build()
export const DARK_SOULS = gameFactory.build({
  name: 'Dark Souls',
  published: false,
  publishedAt: null,
  slug: 'dark-souls',
})
export const NEW_GAME = gameFactory.build({
  bannerImage: {},
  name: 'Secret of Evermore',
  published: false,
  publishedAt: null,
  slug: 'secret-of-evermore',
})

export const GAMES = [SUPER_METROID, DARK_SOULS]

export const GET_GAMES_RESPONSE_DATA: GamesIndexJson = {
  games: GAMES,
  totalPages: 1,
}

export const GET_GAMES_WITH_SEARCH_PARAMS_RESPONSE_DATA: GamesIndexJson = {
  games: GAMES,
  totalPages: 1,
}
