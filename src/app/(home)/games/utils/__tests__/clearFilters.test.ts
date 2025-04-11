import { getParamsWithoutFilters } from '..'

describe('getParamsWithoutFilters', () => {
  it('should clear the relevant filters', () => {
    const searchParams = new URLSearchParams()
    searchParams.append('companies[]', '1')
    searchParams.append('genres[]', '1')
    searchParams.append('platforms[]', '1')
    searchParams.append('query', 'zelda')
    const result = getParamsWithoutFilters(searchParams)
    expect(result).toBe('query=zelda')
  })
})
