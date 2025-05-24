import { Factory } from 'fishery'

export const bannerImageFactory = Factory.define<Game['bannerImage']>(
  ({ sequence }) => ({
    mobile: {
      url: `https://test.com/storage/uploads/games/${sequence}/mobile.webp`,
    },
    url: `https://test.com/storage/uploads/games/${sequence}/regular.webp`,
  }),
)
