import { AxiosError } from 'axios'

export class ErrorFacade<GQError extends AxiosError<{ message: string }>> {
  private error: GQError

  constructor(error: unknown) {
    this.error = error as GQError
  }

  public get response() {
    return this.error.response
  }

  public get data() {
    return this.response?.data
  }

  public get message() {
    return this.data?.message ?? this.error.message
  }
}
