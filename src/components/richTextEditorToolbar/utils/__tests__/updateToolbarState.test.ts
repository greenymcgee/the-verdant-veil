import { $isLinkNode } from '@lexical/link'
import { $isHeadingNode } from '@lexical/rich-text'
import { $getSelection, $isRangeSelection, LexicalNode } from 'lexical'

import { createMockLexicalSelection } from '@/test/helpers'

import { updateToolbarState } from '..'

vi.mock('lexical', async () => {
  const actual = await vi.importActual('lexical')
  return {
    ...actual,
    $getSelection: vi.fn(),
    $isRangeSelection: vi.fn(),
  }
})

vi.mock('@lexical/rich-text', async () => {
  const actual = await vi.importActual('@lexical/rich-text')
  return { ...actual, $isHeadingNode: vi.fn() }
})

vi.mock('@lexical/link', async () => {
  const actual = await vi.importActual('@lexical/link')
  return { ...actual, $isLinkNode: vi.fn() }
})

const setState = vi.fn()
const DEFAULT_STATE = {
  isBold: false,
  isH2: false,
  isH3: false,
  isH4: false,
  isH5: false,
  isH6: false,
  isItalic: false,
  isLink: false,
}

afterEach(() => {
  vi.clearAllMocks()
})

describe('updateToolbarState', () => {
  it('should do nothing if the selection is not in range', () => {
    vi.mocked($getSelection).mockReturnValue(null)
    updateToolbarState(setState)
    expect(setState).not.toHaveBeenCalled()
  })

  it('should update state with default values when no formatting is active', () => {
    const mockSelection = createMockLexicalSelection()
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isHeadingNode).mockReturnValue(false)
    vi.mocked($isLinkNode).mockReturnValue(false)
    updateToolbarState(setState)
    expect(setState).toHaveBeenCalledWith(DEFAULT_STATE)
  })

  it('should detect bold formatting', () => {
    const mockSelection = createMockLexicalSelection({
      formatResults: { bold: true },
    })
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isHeadingNode).mockReturnValue(false)
    vi.mocked($isLinkNode).mockReturnValue(false)
    updateToolbarState(setState)
    expect(setState).toHaveBeenCalledWith({ ...DEFAULT_STATE, isBold: true })
  })

  it('should detect italic formatting', () => {
    const mockSelection = createMockLexicalSelection({
      formatResults: { italic: true },
    })
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isHeadingNode).mockReturnValue(false)
    vi.mocked($isLinkNode).mockReturnValue(false)
    updateToolbarState(setState)
    expect(setState).toHaveBeenCalledWith({ ...DEFAULT_STATE, isItalic: true })
  })

  it.each(['h2', 'h3', 'h4', 'h5', 'h6'])(
    'should detect headings',
    (heading) => {
      const mockSelection = createMockLexicalSelection({ elementTag: heading })
      vi.mocked($getSelection).mockReturnValue(mockSelection)
      vi.mocked($isRangeSelection).mockReturnValue(true)
      vi.mocked($isHeadingNode).mockReturnValue(true)
      vi.mocked($isLinkNode).mockReturnValue(false)
      updateToolbarState(setState)
      expect(setState).toHaveBeenCalledWith({
        ...DEFAULT_STATE,
        [`is${heading.toUpperCase()}`]: true,
      })
    },
  )

  it('should detect links on anchor node', () => {
    const mockSelection = createMockLexicalSelection()
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isHeadingNode).mockReturnValue(false)
    vi.mocked($isLinkNode).mockImplementation(
      (node) => node === mockSelection.anchor.getNode(),
    )
    updateToolbarState(setState)
    expect(setState).toHaveBeenCalledWith({ ...DEFAULT_STATE, isLink: true })
  })

  it('should detect links on parent node', () => {
    const parentNode = { __type: 'link' } as LexicalNode
    const mockSelection = createMockLexicalSelection({ parentNode })
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isHeadingNode).mockReturnValue(false)
    vi.mocked($isLinkNode).mockImplementation((node) => node === parentNode)
    updateToolbarState(setState)
    expect(setState).toHaveBeenCalledWith({ ...DEFAULT_STATE, isLink: true })
  })

  it('should handle root node selection', () => {
    const mockSelection = createMockLexicalSelection({ nodeKey: 'root' })
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isHeadingNode).mockReturnValue(false)
    vi.mocked($isLinkNode).mockReturnValue(false)
    updateToolbarState(setState)
    expect(setState).toHaveBeenCalledTimes(1)
  })

  it('should handle multiple formatting states simultaneously', () => {
    const parentNode = { __type: 'link' } as LexicalNode
    const mockSelection = createMockLexicalSelection({
      elementTag: 'h4',
      formatResults: { bold: true, italic: true },
      parentNode,
    })
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isHeadingNode).mockReturnValue(true)
    vi.mocked($isLinkNode).mockImplementation((node) => node === parentNode)
    updateToolbarState(setState)
    expect(setState).toHaveBeenCalledWith({
      ...DEFAULT_STATE,
      isBold: true,
      isH4: true,
      isItalic: true,
      isLink: true,
    })
  })

  it('should call setState only once per update', () => {
    const mockSelection = createMockLexicalSelection()
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isHeadingNode).mockReturnValue(false)
    vi.mocked($isLinkNode).mockReturnValue(false)
    updateToolbarState(setState)
    expect(setState).toHaveBeenCalledTimes(1)
  })
})
