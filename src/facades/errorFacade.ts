import { AxiosError } from 'axios'

export class ErrorFacade<GQError extends AxiosError<{ message: string }>> {
  private defaultMessage: string

  public error: GQError

  constructor(error: unknown, defaultMessage = 'Whoops, something went wrong') {
    this.error = error as GQError
    this.defaultMessage = defaultMessage
  }

  public get data() {
    return this.response?.data
  }

  public get isNotFoundError() {
    return this.status === 404
  }

  public get isServerError() {
    return String(this.status).at(0) === '5'
  }

  public get message() {
    return this.data?.message ?? this.defaultMessage
  }

  public get response() {
    return this.error.response
  }

  public get status() {
    return this.error.status
  }
}
