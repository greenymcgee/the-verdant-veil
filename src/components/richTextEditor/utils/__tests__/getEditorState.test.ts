import { TIP_TAP_EDITOR } from '@/test'

import { getEditorState } from '../getEditorState'

afterEach(() => {
  vi.clearAllMocks()
})

describe('getEditorState', () => {
  it('should return a default state if editor is blank', () => {
    const result = getEditorState(null)
    expect(result).toEqual({})
  })

  it('should return an updated state when the editor is present', () => {
    const result = getEditorState(TIP_TAP_EDITOR)
    expect(result).toEqual({
      isBoldActive: true,
      isH2Active: true,
      isH3Active: true,
      isH4Active: true,
      isH5Active: true,
      isH6Active: true,
      isItalicActive: true,
      isLinkActive: true,
      isUnsetLinkActive: false,
    })
  })
})
