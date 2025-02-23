import { searchQueryFacade } from '..'

describe('searchQueryFacade', () => {
  describe('update', () => {
    it('should update the params and query attributes', () => {
      searchQueryFacade.update('query', new URLSearchParams('?ted=bill'))
      expect(searchQueryFacade).toMatchObject({
        params: new URLSearchParams('?ted=bill'),
        query: 'query',
      })
    })
  })

  describe('updatedParams', () => {
    it('should preserve previous params unrelated to the query', () => {
      searchQueryFacade.update('', new URLSearchParams('?ted=bill'))
      expect(searchQueryFacade.updatedParams).toEqual(
        new URLSearchParams('?ted=bill'),
      )
    })

    it('should delete the page param when it is present', () => {
      searchQueryFacade.update('', new URLSearchParams('?page=2'))
      expect(searchQueryFacade.updatedParams).toEqual(new URLSearchParams())
    })

    it('should delete the query param when the query arg is blank', () => {
      searchQueryFacade.update('', new URLSearchParams('query=query'))
      expect(searchQueryFacade.updatedParams).toEqual(new URLSearchParams())
    })

    it('should update the query param', () => {
      searchQueryFacade.update('new', new URLSearchParams('query=old'))
      expect(searchQueryFacade.updatedParams).toEqual(
        new URLSearchParams('?query=new'),
      )
    })
  })
})
