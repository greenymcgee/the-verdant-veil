import { isValidJson } from '..'

describe('isValidJson', () => {
  it('should return true when json is valid', () => {
    const result = isValidJson('')
    expect(result).toBe(false)
  })

  it('should return false when json is invalid', () => {
    const result = isValidJson('{}')
    expect(result).toBe(true)
  })
})
