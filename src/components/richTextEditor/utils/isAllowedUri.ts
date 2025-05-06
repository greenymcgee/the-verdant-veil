import { LinkOptions } from '@tiptap/extension-link'

import { AllowedUriFacade } from '../facades'

export function isAllowedUri(
  url: string,
  context: SecondParameterOf<LinkOptions['isAllowedUri']>,
) {
  return new AllowedUriFacade(url, context).allowed
}
