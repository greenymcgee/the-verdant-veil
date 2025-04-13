import { SUPER_METROID } from './games'

export const GET_GAME_FILTERS_RESPONSE_DATA: GameFiltersIndexJson = {
  filters: {
    companies: [
      ...SUPER_METROID.developers,
      ...SUPER_METROID.publishers,
      ...SUPER_METROID.supporters,
      ...SUPER_METROID.porters,
    ],
    genres: SUPER_METROID.genres,
    platforms: SUPER_METROID.platforms,
  },
}
