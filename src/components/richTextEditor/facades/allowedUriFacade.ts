import { LinkOptions } from '@tiptap/extension-link'

type Context = SecondParameterOf<LinkOptions['isAllowedUri']>

const DISALLOWED_PROTOCOLS = ['ftp', 'file', 'mailto']

export class AllowedUriFacade {
  private context: Context

  private url: string

  constructor(url: string, context: Context) {
    this.context = context
    this.url = url
  }

  public get allowed() {
    try {
      if (!this.context.defaultValidate(this.parsedUrl.href)) return false

      if (DISALLOWED_PROTOCOLS.includes(this.protocol)) return false

      if (!this.allowedProtocols.includes(this.protocol)) return false

      return true
    } catch {
      return false
    }
  }

  private get allowedProtocols() {
    return this.context.protocols.map((protocol) =>
      typeof protocol === 'string' ? protocol : protocol.scheme,
    )
  }

  private get parsedUrl() {
    if (this.url.includes(':')) return new URL(this.url)

    return new URL(`${this.context.defaultProtocol}://${this.url}`)
  }

  private get protocol() {
    return this.parsedUrl.protocol.replace(':', '')
  }
}
