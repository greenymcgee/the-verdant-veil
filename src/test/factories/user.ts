import { Factory } from 'fishery'

export const userFactory = Factory.define<User>(({ sequence }) => ({
  admin: false,
  email: `test${sequence}@test.com`,
  firstName: 'Bart',
  id: sequence,
  lastName: 'Simpson',
  username: 'eatMyShorts',
}))
