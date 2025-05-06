import { TIP_TAP_EDITOR } from '@/test'

import { handleSetLinkClicked } from '..'

beforeAll(() => {
  vi.stubGlobal('window', { prompt: vi.fn() })
})
afterEach(() => {
  vi.clearAllMocks()
})

describe('handleSetLinkClicked', () => {
  it('should do nothing when the url is null', () => {
    vi.mocked(window.prompt).mockReturnValue(null)
    handleSetLinkClicked(TIP_TAP_EDITOR)()
    expect(TIP_TAP_EDITOR.chain).not.toHaveBeenCalled()
  })

  it('should unset the link when the url is an empty string', () => {
    vi.mocked(window.prompt).mockReturnValue('')
    handleSetLinkClicked(TIP_TAP_EDITOR)()
    expect(
      TIP_TAP_EDITOR.chain().focus().extendMarkRange('link').unsetLink().run,
    ).toHaveBeenCalled()
  })

  it('should set the link when the url is present', () => {
    const url = 'http://www.ned-not.com'
    vi.mocked(window.prompt).mockReturnValue(url)
    handleSetLinkClicked(TIP_TAP_EDITOR)()
    expect(
      TIP_TAP_EDITOR.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url }).run,
    ).toHaveBeenCalled()
  })
})
