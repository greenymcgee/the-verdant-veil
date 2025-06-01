import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'

import { API_ROUTES, ROUTES } from '@/constants'
import { baseApi } from '@/lib/baseApi'

type ResetPasswordError = AxiosError<{ message: string }>
type Route = typeof API_ROUTES.resetPassword

async function patchResetPassword(url: string, { arg }: { arg: FormData }) {
  return await baseApi.patch(url, arg)
}

export function usePatchResetPassword() {
  const { push } = useRouter()
  return useSWRMutation<AxiosResponse, ResetPasswordError, Route, FormData>(
    API_ROUTES.resetPassword,
    patchResetPassword,
    {
      onError(error) {
        toast.error(
          error.response?.data.message ?? 'Whoops, something went wrong',
        )
      },
      onSuccess() {
        push(ROUTES.login)
        toast.success('Your password has been reset!')
      },
    },
  )
}
