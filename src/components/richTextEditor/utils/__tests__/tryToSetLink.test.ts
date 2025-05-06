import { TIP_TAP_EDITOR } from '@/test'
import { toastMock } from '@/test/helpers'

import { tryToSetLink } from '..'

afterEach(() => {
  vi.clearAllMocks()
})

describe('tryToSetLink', () => {
  it('should set the link when no error is thrown', () => {
    const url = 'http://www.ned-not.com'
    tryToSetLink(TIP_TAP_EDITOR, url)
    expect(
      TIP_TAP_EDITOR.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url }).run,
    ).toHaveBeenCalled()
  })

  it('should toast an error', () => {
    const url = 'http://www.ned-not.com'
    vi.mocked(TIP_TAP_EDITOR.chain).mockImplementation(() => {
      throw new Error('message')
    })
    tryToSetLink(TIP_TAP_EDITOR, url)
    expect(toastMock.error).toHaveBeenCalledWith('message')
  })
})
