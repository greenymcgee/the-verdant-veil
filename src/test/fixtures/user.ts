import { userFactory } from '../factories'

export const ADMIN_USER = userFactory.build()
export const BASIC_USER = userFactory.build({
  admin: false,
  firstName: 'Ned',
  lastName: 'Flanders',
  username: 'flanMan',
})
