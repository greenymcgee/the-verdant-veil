import { Factory } from 'fishery'

export const videoFactory = Factory.define<GameVideo>(({ sequence }) => ({
  createdAt: '',
  id: sequence,
  igdbId: sequence,
  name: 'Trailer',
  updatedAt: '',
  videoId: `video-${sequence}`,
}))
