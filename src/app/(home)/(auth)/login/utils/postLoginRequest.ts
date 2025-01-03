import zod from 'zod'

import { API_ROUTES } from '@/constants'
import { baseApi } from '@/modules'

const schema = zod.object({
  user: zod.object({
    email: zod.string().nonempty(),
    password: zod.string().nonempty(),
  }),
})

function validateLoginData(formData: FormData) {
  return schema.parse({
    user: {
      email: formData.get('email'),
      password: formData.get('password'),
    },
  })
}

export async function postLoginRequest(formData: FormData) {
  const { data, headers } = await baseApi.post<UsersShowJson>(
    API_ROUTES.login,
    validateLoginData(formData),
  )
  const [, token] = headers['authorization'].split(' ')
  return { token, user: data.user }
}
