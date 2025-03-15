import { AxiosError, AxiosResponse } from 'axios'

import { ErrorFacade } from '..'

const STATUS_TEXT = 'Server Error'
const MESSAGE = 'error'
const DATA = { message: MESSAGE }
const RESPONSE = {
  config: {} as unknown as AxiosResponse['config'],
  data: DATA,
  headers: {},
  status: 500,
  statusText: STATUS_TEXT,
}
const ERROR = new AxiosError(
  STATUS_TEXT,
  undefined,
  undefined,
  undefined,
  RESPONSE,
)

describe('ErrorFacade', () => {
  describe('data', () => {
    it('should return the data when it is present', () => {
      const result = new ErrorFacade(ERROR)
      expect(result.data).toEqual(DATA)
    })

    it('should return undefined when the response is blank', () => {
      const result = new ErrorFacade(new AxiosError(STATUS_TEXT))
      expect(result.data).toBeUndefined()
    })
  })

  describe('isNotFoundError', () => {
    it('should be true when the status is 404', () => {
      const result = new ErrorFacade(
        new AxiosError(STATUS_TEXT, undefined, undefined, undefined, {
          ...RESPONSE,
          status: 404,
        }),
      )
      expect(result.isNotFoundError).toBe(true)
    })

    it('should be false when the status is not 404', () => {
      const result = new ErrorFacade(
        new AxiosError(STATUS_TEXT, undefined, undefined, undefined, RESPONSE),
      )
      expect(result.isNotFoundError).toBe(false)
    })
  })

  describe('isServerError', () => {
    it('should be true when the status starts with 5', () => {
      const result = new ErrorFacade(
        new AxiosError(STATUS_TEXT, undefined, undefined, undefined, RESPONSE),
      )
      expect(result.isServerError).toBe(true)
    })

    it('should be false when the status does not start with 5', () => {
      const result = new ErrorFacade(
        new AxiosError(STATUS_TEXT, undefined, undefined, undefined, {
          ...RESPONSE,
          status: 404,
        }),
      )
      expect(result.isServerError).toBe(false)
    })
  })

  describe('message', () => {
    it('should return the message when it is present', () => {
      const result = new ErrorFacade(ERROR)
      expect(result.message).toEqual(MESSAGE)
    })

    it('should return a default message', () => {
      const result = new ErrorFacade(new AxiosError(STATUS_TEXT))
      expect(result.message).toEqual('Whoops, something went wrong')
    })

    it('should return the given default message', () => {
      const result = new ErrorFacade(new AxiosError(STATUS_TEXT), 'Message')
      expect(result.message).toBe('Message')
    })
  })

  describe('response', () => {
    it('should return the response when it is present', () => {
      const result = new ErrorFacade(ERROR)
      expect(result.response).toEqual(RESPONSE)
    })
  })

  describe('status', () => {
    it('should return error status', () => {
      const result = new ErrorFacade(
        new AxiosError(STATUS_TEXT, undefined, undefined, undefined, RESPONSE),
        'Message',
      )
      expect(result.status).toBe(RESPONSE.status)
    })
  })
})
