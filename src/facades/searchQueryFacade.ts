class QueryParamsFacade {
  private params: URLSearchParams

  private query: string

  constructor(query: string, params: URLSearchParams) {
    this.query = query
    this.params = params
  }

  public update(query: string, params: URLSearchParams) {
    this.query = query
    this.params = params
  }

  public get updatedParams() {
    this.setOrDeleteQueryParam()
    this.deletePageParam()
    return this.params
  }

  private deletePageParam = () => {
    if (!this.params.get('page')) return

    this.params.delete('page')
  }

  private setOrDeleteQueryParam = () => {
    if (this.query) return this.params.set('query', this.query)

    this.params.delete('query')
  }
}

export const searchQueryFacade = new QueryParamsFacade(
  '',
  new URLSearchParams(),
)
