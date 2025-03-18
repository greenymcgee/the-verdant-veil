import { Factory } from 'fishery'

export const artworkFactory = Factory.define<Artwork>(({ sequence }) => ({
  animated: false,
  createdAt: '',
  height: 24,
  id: sequence,
  igdbId: sequence,
  updatedAt: '',
  url: `http://gq-test.com/photos/${sequence}`,
  width: 56,
}))
