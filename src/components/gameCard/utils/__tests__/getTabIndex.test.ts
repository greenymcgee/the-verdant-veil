import { getTabIndex } from '..'

describe('getTabIndex', () => {
  it('should return -1 when validating', () => {
    const result = getTabIndex({ active: true, validating: true })
    expect(result).toBe(-1)
  })

  it('should return -1 when active is false', () => {
    const result = getTabIndex({ active: false, validating: false })
    expect(result).toBe(-1)
  })

  it('should return 0 when active is true and validating is false', () => {
    const result = getTabIndex({ active: true, validating: false })
    expect(result).toBe(0)
  })
})
