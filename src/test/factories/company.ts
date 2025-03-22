import { Factory } from 'fishery'

export const companyFactory = Factory.define<Company>(({ sequence }) => ({
  countryCode: 0,
  createdAt: '',
  description: 'A company',
  id: sequence,
  igdbId: sequence,
  name: 'Nintendo EAD',
  slug: 'nintendo-ead',
  startDate: '',
  updatedAt: '',
}))
