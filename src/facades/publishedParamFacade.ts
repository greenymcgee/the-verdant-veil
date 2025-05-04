interface Params {
  published: boolean | undefined
  searchParams: URLSearchParams
}

export class PublishedParamFacade {
  private published: boolean

  private searchParams: URLSearchParams

  constructor(params: Params) {
    this.published = Boolean(params.published)
    this.searchParams = params.searchParams
  }

  public update({ published, searchParams }: Params) {
    this.published = Boolean(published)
    this.searchParams = searchParams
  }

  public setOrDeletePublishedParam() {
    if (this.published) return this.setPublished()

    this.deletePublished()
  }

  private setPublished() {
    if (this.searchParams.has('published')) return

    this.searchParams.set('published', String(this.published))
  }

  private deletePublished() {
    if (!this.searchParams.has('published')) return

    this.searchParams.delete('published')
  }
}

export const publishedParamFacade = new PublishedParamFacade({
  published: false,
  searchParams: new URLSearchParams(),
})
