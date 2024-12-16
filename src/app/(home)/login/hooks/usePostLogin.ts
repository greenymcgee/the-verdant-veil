import { AxiosError, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'

import { API_ROUTES } from '@/constants'
import { baseApi } from '@/modules/baseApi'

async function postLogin(url: string, { arg }: { arg: FormData }) {
  return await baseApi.post(url, arg)
}

export function usePostLogin() {
  return useSWRMutation<
    AxiosResponse<User>,
    AxiosError<{ error: string }>,
    typeof API_ROUTES.login,
    FormData
  >(API_ROUTES.login, postLogin, {
    onError(error) {
      toast.error(error.response?.data.error ?? 'Whoops, something went wrong')
    },
    onSuccess(response) {
      baseApi.defaults.headers.common['Authorization'] =
        response.headers['authorization']
      // TODO #84: redirect here
    },
  })
}
