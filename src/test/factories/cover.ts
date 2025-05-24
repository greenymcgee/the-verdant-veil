import { Factory } from 'fishery'

const currentTime = new Date().toISOString()

export const coverFactory = Factory.define<Cover>(({ sequence }) => ({
  animated: false,
  createdAt: currentTime,
  height: 24,
  id: sequence,
  igdbId: sequence,
  imageId: `cover-image-${sequence}`,
  updatedAt: currentTime,
  url: `http://test-tvv.com/covers/${sequence}`,
  width: 56,
}))
