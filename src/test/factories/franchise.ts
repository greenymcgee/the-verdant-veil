import { Factory } from 'fishery'

export const franchiseFactory = Factory.define<Franchise>(({ sequence }) => ({
  createdAt: '',
  description: 'A franchise',
  id: sequence,
  igdbId: sequence,
  main: true,
  name: 'The Legend of Zelda',
  slug: 'the-legend-of-zelda',
  updatedAt: '',
}))
