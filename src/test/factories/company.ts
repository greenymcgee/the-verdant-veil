import { kebabCase } from 'change-case'
import { Factory } from 'fishery'

export const companyFactory = Factory.define<Company>(
  ({ params, sequence }) => {
    const defaultSlug = params.name ? kebabCase(params.name) : 'nintendo-ead'
    return {
      countryCode: 0,
      createdAt: '',
      description: 'A company',
      id: sequence,
      igdbId: sequence,
      name: 'Nintendo EAD',
      slug: params.slug || defaultSlug,
      startDate: '',
      updatedAt: '',
    }
  },
)
