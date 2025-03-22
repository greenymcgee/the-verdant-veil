import { Factory } from 'fishery'

export const playerPerspectiveFactory = Factory.define<PlayerPerspective>(
  ({ sequence }) => ({
    createdAt: '',
    description: 'A player perspective',
    id: sequence,
    igdbId: sequence,
    name: 'Bird View',
    slug: 'bird-view',
    updatedAt: '',
  }),
)
