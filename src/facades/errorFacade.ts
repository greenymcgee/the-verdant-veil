import { AxiosError } from 'axios'

export class ErrorFacade<Data extends { message: string }> {
  private defaultMessage: string

  public error: AxiosError<Data> | undefined

  constructor(error: unknown, defaultMessage = 'Whoops, something went wrong') {
    this.error = error as AxiosError<Data>
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
    return this.error?.response
  }

  public get status() {
    return this.error?.status
  }
}
