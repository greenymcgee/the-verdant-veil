import { getTabIndex } from '..'

describe('getTabIndex', () => {
  it('should return 0 when active is true and validating is false', () => {
    const result = getTabIndex({ active: true, validating: false })
    expect(result).toBe(0)
  })

  it('should return -1 when active is true and validating is true', () => {
    const result = getTabIndex({ active: true, validating: true })
    expect(result).toBe(-1)
  })

  it('should return -1 when both active and validating are false', () => {
    const result = getTabIndex({ active: false, validating: false })
    expect(result).toBe(-1)
  })

  it('should return -1 when active is false and validating is true', () => {
    const result = getTabIndex({ active: false, validating: true })
    expect(result).toBe(-1)
  })

  it('should return 0 when active is undefined and validating is false', () => {
    const result = getTabIndex({ active: undefined, validating: false })
    expect(result).toBe(0)
  })

  it('should return -1 when active is undefined validating is true', () => {
    const result = getTabIndex({ active: undefined, validating: true })
    expect(result).toBe(-1)
  })
})
