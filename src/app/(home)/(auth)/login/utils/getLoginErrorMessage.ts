import { AxiosError } from 'axios'

export function getLoginErrorMessage(error: unknown) {
  const axiosError = error as AxiosError<{ error: string }>
  return axiosError?.response?.data.error ?? 'Something went wrong'
}
