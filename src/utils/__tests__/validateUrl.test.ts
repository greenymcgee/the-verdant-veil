import { validateUrl } from '..'

describe('validateUrl', () => {
  it('should return true when given a valid url', () => {
    expect(validateUrl('http://test-tvv.com')).toBe(true)
  })

  it('should return false when given an invalid url', () => {
    expect(validateUrl('/')).toBe(false)
  })
})
