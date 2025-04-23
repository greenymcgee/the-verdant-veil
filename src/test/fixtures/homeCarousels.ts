import { SUPER_METROID, THREADS_OF_FATE } from './games'

export const GET_SNES_CAROUSEL_RESPONSE_DATA: HomeCarouselsShowJson = {
  carousel: { games: [SUPER_METROID] },
}

export const GET_PS1_CAROUSEL_RESPONSE_DATA: HomeCarouselsShowJson = {
  carousel: { games: [THREADS_OF_FATE] },
}

export const GET_CURRENTLY_PLAYING_CAROUSEL_RESPONSE_DATA: HomeCarouselsShowJson =
  {
    carousel: { games: [SUPER_METROID] },
  }
