import { Factory } from 'fishery'

export const platformFactory = Factory.define<Platform>(({ sequence }) => ({
  abbreviation: 'SNES',
  alternativeName: '',
  createdAt: '',
  games: [],
  generation: 1,
  id: sequence,
  igdbId: sequence,
  name: 'Super Nintendo Entertainment System',
  slug: 'super-nintendo-entertainment-system',
  summary: '',
  updatedAt: '',
}))
