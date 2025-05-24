import { kebabCase } from 'change-case'
import { Factory } from 'fishery'

export const gameModeFactory = Factory.define<GameMode>(
  ({ params, sequence }) => {
    const defaultSlug = params.name ? kebabCase(params.name) : 'single-player'
    return {
      createdAt: '',
      description: 'A game mode',
      id: sequence,
      igdbId: sequence,
      name: 'Single Player',
      slug: params.slug || defaultSlug,
      updatedAt: '',
    }
  },
)
