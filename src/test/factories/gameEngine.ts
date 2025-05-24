import { kebabCase } from 'change-case'
import { Factory } from 'fishery'

export const gameEngineFactory = Factory.define<GameEngine>(
  ({ params, sequence }) => {
    const defaultSlug = params.name ? kebabCase(params.name) : 'unreal'
    return {
      createdAt: '',
      description: 'A game engine',
      id: sequence,
      igdbId: sequence,
      name: 'Unreal',
      slug: params.slug || defaultSlug,
      updatedAt: '',
    }
  },
)
