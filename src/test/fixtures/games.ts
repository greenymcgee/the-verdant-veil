import { gameFactory } from '../factories'

export const SUPER_METROID = gameFactory.build()
export const DARK_SOULS = gameFactory.build({ name: 'Dark Souls' })

export const GAMES = [SUPER_METROID, DARK_SOULS]

export const GET_GAMES_RESPONSE_DATA: GamesIndexJson = { games: GAMES }
