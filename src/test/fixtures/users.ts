import { userFactory } from '../factories'

export const ADMIN_USER = userFactory.build({ admin: true })
export const BASIC_USER = userFactory.build({
  firstName: 'Ned',
  lastName: 'Flanders',
  username: 'flanMan',
})
