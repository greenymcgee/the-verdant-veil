import { Factory } from 'fishery'

export const themeFactory = Factory.define<Theme>(({ sequence }) => ({
  createdAt: '',
  description: 'A theme',
  id: sequence,
  igdbId: sequence,
  name: 'Action',
  slug: 'action',
  updatedAt: '',
}))
