import { kebabCase } from 'change-case'
import { Factory } from 'fishery'

export const themeFactory = Factory.define<Theme>(({ params, sequence }) => {
  const defaultSlug = params.name ? kebabCase(params.name) : 'action'
  return {
    createdAt: '',
    description: 'A theme',
    id: sequence,
    igdbId: sequence,
    name: 'Action',
    slug: params.slug || defaultSlug,
    updatedAt: '',
  }
})
