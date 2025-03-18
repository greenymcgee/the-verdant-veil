import { genreFactory } from '../factories'
import { SUPER_METROID } from './games'

export const RPG_GENRE = genreFactory.build()
export const PLATFORM_GENRE = genreFactory.build(
  {
    name: 'Platform',
    slug: 'platform',
  },
  { associations: SUPER_METROID },
)
export const ADVENTURE_GENRE = genreFactory.build(
  {
    name: 'Adventure',
    slug: 'adventure',
  },
  { associations: SUPER_METROID },
)
