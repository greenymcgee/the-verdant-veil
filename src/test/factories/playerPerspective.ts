import { kebabCase } from 'change-case'
import { Factory } from 'fishery'

export const playerPerspectiveFactory = Factory.define<PlayerPerspective>(
  ({ params, sequence }) => {
    const defaultSlug = params.name ? kebabCase(params.name) : 'bird-view'
    return {
      createdAt: '',
      description: 'A player perspective',
      id: sequence,
      igdbId: sequence,
      name: 'Bird View',
      slug: params.slug || defaultSlug,
      updatedAt: '',
    }
  },
)
