import { gameFactory } from '../factories'

export const SUPER_METROID = gameFactory.build({
  currentlyPlaying: true,
  estimatedFirstPlayedDate: '1-1-1999',
  lastPlayedDate: '1-1-2023',
})
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

export const THREADS_OF_FATE = gameFactory.build({
  bannerImage: {},
  name: 'Threads of Fate',
  published: false,
  publishedAt: null,
  slug: 'threads-of-fate',
})

export const GAMES = [SUPER_METROID, DARK_SOULS]

export const GET_GAMES_RESPONSE_DATA: GamesIndexJson = {
  games: GAMES,
  totalPages: 1,
}

export const GET_GAMES_WITH_SEARCH_PARAMS_RESPONSE_DATA: GamesIndexJson = {
  games: [gameFactory.build(), gameFactory.build()],
  totalPages: 1,
}

export const GET_PUBLISHED_GAMES_RESPONSE_DATA: GamesIndexJson = {
  games: [SUPER_METROID, gameFactory.build(), gameFactory.build()],
  totalPages: 1,
}
