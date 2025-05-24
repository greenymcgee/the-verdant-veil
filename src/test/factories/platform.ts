import { kebabCase } from 'change-case'
import { Factory } from 'fishery'

export const platformFactory = Factory.define<Platform>(
  ({ associations, params, sequence }) => {
    const defaultSlug = params.name ? kebabCase(params.name) : 'snes'
    return {
      abbreviation: 'SNES',
      alternativeName: '',
      createdAt: '',
      games: associations.games || [],
      generation: 1,
      id: sequence,
      igdbId: sequence,
      name: 'Super Nintendo Entertainment System',
      slug: params.slug || defaultSlug,
      summary: '',
      updatedAt: '',
    }
  },
)
