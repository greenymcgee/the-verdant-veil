import { AxiosError } from 'axios'

export class ErrorFacade<GQError extends AxiosError<{ message: string }>> {
  private defaultMessage: string

  private error: GQError

  constructor(error: unknown, defaultMessage = 'Whoops, something went wrong') {
    this.error = error as GQError
    this.defaultMessage = defaultMessage
  }

  public get response() {
    return this.error.response
  }

  public get data() {
    return this.response?.data
  }

  public get message() {
    return this.data?.message ?? this.defaultMessage
  }
}
