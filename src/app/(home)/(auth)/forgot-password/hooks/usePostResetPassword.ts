import { AxiosError, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'

import { API_ROUTES } from '@/constants'
import { baseApi } from '@/modules/baseApi'

type ResetPasswordError = AxiosError<{ message: string }>
type Route = typeof API_ROUTES.resetPassword

async function postResetPassword(url: string, { arg }: { arg: FormData }) {
  return await baseApi.post(url, arg)
}

export function usePostResetPassword() {
  return useSWRMutation<AxiosResponse, ResetPasswordError, Route, FormData>(
    API_ROUTES.resetPassword,
    postResetPassword,
    {
      onError(error) {
        toast.error(
          error.response?.data.message ?? 'Whoops, something went wrong',
        )
      },
      onSuccess() {
        toast.success('An email has been sent!')
      },
    },
  )
}
