import { getLoginErrorMessage } from '..'

describe('getLoginErrorMessage', () => {
  it('should return the "error" when one is returned from the API', () => {
    const result = getLoginErrorMessage({
      response: { data: { error: 'API error message' } },
    })
    expect(result).toEqual('API error message')
  })

  it('should return a generic message when the error is undefined', () => {
    const result = getLoginErrorMessage(undefined)
    expect(result).toEqual('Something went wrong')
  })

  it('should return a generic message when the response is undefined', () => {
    const result = getLoginErrorMessage({})
    expect(result).toEqual('Something went wrong')
  })
})
