import { kebabCase } from 'change-case'
import { Factory } from 'fishery'

export const genreFactory = Factory.define<Genre>(
  ({ associations, params, sequence }) => {
    const defaultSlug = params.name ? kebabCase(params.name) : 'rpg'
    return {
      createdAt: '',
      games: associations.games || [],
      id: sequence,
      igdbId: sequence,
      name: 'RPG',
      slug: params.slug || defaultSlug,
      updatedAt: '',
    }
  },
)
