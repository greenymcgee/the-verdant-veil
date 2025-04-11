import { filtersPresent } from '..'

describe('filtersPresent', () => {
  it('should be false when relevant params are not present', () => {
    const searchParams = new URLSearchParams()
    searchParams.append('irrelevant[]', '1')
    const result = filtersPresent(searchParams)
    expect(result).toBe(false)
  })

  it('should be true when companies are present', () => {
    const searchParams = new URLSearchParams()
    searchParams.append('companies[]', '1')
    const result = filtersPresent(searchParams)
    expect(result).toBe(true)
  })

  it('should be true when genres are present', () => {
    const searchParams = new URLSearchParams()
    searchParams.append('genres[]', '1')
    const result = filtersPresent(searchParams)
    expect(result).toBe(true)
  })

  it('should be true when platforms are present', () => {
    const searchParams = new URLSearchParams()
    searchParams.append('platforms[]', '1')
    const result = filtersPresent(searchParams)
    expect(result).toBe(true)
  })
})
