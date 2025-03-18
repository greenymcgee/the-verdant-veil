import { Factory } from 'fishery'

export const genreFactory = Factory.define<Genre>(({ sequence }) => ({
  createdAt: '',
  games: [],
  id: sequence,
  igdbId: sequence,
  name: 'RPG',
  slug: 'rpg',
  updatedAt: '',
}))
