import {
  artworkFactory,
  bannerImageFactory,
  franchiseFactory,
  gameFactory,
  videoFactory,
} from '../factories'

export const SUPER_METROID = gameFactory
  .associations({
    artworks: [artworkFactory.build(), artworkFactory.build()],
    franchises: [franchiseFactory.build()],
    videos: [videoFactory.build(), videoFactory.build()],
  })
  .build({
    bannerImage: bannerImageFactory.build(),
    currentlyPlaying: true,
    estimatedFirstPlayedDate: '1994-03-12T15:57',
    lastPlayedDate: '2023-03-12T15:57',
    name: 'Super Metroid',
    published: true,
    publishedAt: '2025-03-12T15:57',
  })

export const DARK_SOULS = gameFactory.build({
  bannerImage: bannerImageFactory.build(),
  name: 'Dark Souls',
})

export const NEW_GAME = gameFactory.build({ name: 'Secret of Evermore' })

export const THREADS_OF_FATE = gameFactory.build({ name: 'Threads of Fate' })

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
