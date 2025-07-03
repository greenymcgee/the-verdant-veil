import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $getSelection, $isRangeSelection, LexicalEditor } from 'lexical'

import { createMockLexicalSelection } from '@/test/helpers'

import { setLink } from '..'

vi.mock('lexical', async () => {
  const actual = await vi.importActual('lexical')
  return { ...actual, $getSelection: vi.fn(), $isRangeSelection: vi.fn() }
})

vi.mock('@lexical/link', async () => {
  const actual = await vi.importActual('@lexical/link')
  return { ...actual, $isLinkNode: vi.fn() }
})

const EDITOR = { dispatchCommand: vi.fn() } as unknown as LexicalEditor

afterEach(() => {
  vi.clearAllMocks()
})

describe('setLink', () => {
  it('should do nothing when the selection is not in range', () => {
    vi.mocked($getSelection).mockReturnValue(createMockLexicalSelection())
    vi.mocked($isRangeSelection).mockReturnValue(false)
    setLink(EDITOR)()
    expect(EDITOR.dispatchCommand).not.toHaveBeenCalled()
  })

  it('should remove the link when URL is empty', () => {
    const mockSelection = createMockLexicalSelection()
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isLinkNode).mockReturnValue(false)
    vi.spyOn(window, 'prompt').mockReturnValue('')
    setLink(EDITOR)()
    expect(EDITOR.dispatchCommand).toHaveBeenCalledWith(
      TOGGLE_LINK_COMMAND,
      null,
    )
  })

  it('should do nothing when the prompt is cancelled', () => {
    const mockSelection = createMockLexicalSelection()
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isLinkNode).mockReturnValue(false)
    vi.spyOn(window, 'prompt').mockReturnValue(null)
    setLink(EDITOR)()
    expect(EDITOR.dispatchCommand).not.toHaveBeenCalled()
  })

  it('should create a link with a protocol when the URL has no protocol', () => {
    const mockSelection = createMockLexicalSelection()
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isLinkNode).mockReturnValue(false)
    vi.spyOn(window, 'prompt').mockReturnValue('example.com')
    setLink(EDITOR)()
    expect(EDITOR.dispatchCommand).toHaveBeenCalledWith(TOGGLE_LINK_COMMAND, {
      rel: 'noopener noreferrer',
      target: '_blank',
      url: 'https://example.com',
    })
  })

  it('should create a link without modifying the URL when a protocol exists', () => {
    const mockSelection = createMockLexicalSelection()
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isLinkNode).mockReturnValue(false)
    vi.spyOn(window, 'prompt').mockReturnValue('http://example.com')
    setLink(EDITOR)()
    expect(EDITOR.dispatchCommand).toHaveBeenCalledWith(TOGGLE_LINK_COMMAND, {
      rel: 'noopener noreferrer',
      target: '_blank',
      url: 'http://example.com',
    })
  })

  it('should prefill a window prompt with the existing URL when the node is a link', () => {
    const mockLinkNode = {
      getURL: vi.fn().mockReturnValue('https://existing.com'),
    }
    const mockSelection = createMockLexicalSelection()
    mockSelection.anchor.getNode = vi.fn().mockReturnValue(mockLinkNode)
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isLinkNode).mockImplementation(
      (node) => node === (mockLinkNode as unknown as typeof node),
    )
    vi.spyOn(window, 'prompt').mockReturnValue('https://new.com')
    setLink(EDITOR)()
    expect(window.prompt).toHaveBeenCalledWith('URL', 'https://existing.com')
  })

  it('should prefill a window prompt with the parent link URL when the parent is a link', () => {
    const mockParentLinkNode = {
      getURL: vi.fn().mockReturnValue('https://parent.com'),
    }
    const mockSelection = createMockLexicalSelection()
    const anchorNode = mockSelection.anchor.getNode()
    anchorNode.getParent = vi.fn().mockReturnValue(mockParentLinkNode)
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isLinkNode).mockImplementation(
      (node) => node === (mockParentLinkNode as unknown as typeof node),
    )
    vi.spyOn(window, 'prompt').mockReturnValue('https://new.com')
    setLink(EDITOR)()
    expect(window.prompt).toHaveBeenCalledWith('URL', 'https://parent.com')
  })

  it("should prefill a window prompt with an empty string when there isn't an existing link", () => {
    const mockSelection = createMockLexicalSelection()
    vi.mocked($getSelection).mockReturnValue(mockSelection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($isLinkNode).mockReturnValue(false)
    vi.spyOn(window, 'prompt').mockReturnValue('https://new.com')
    setLink(EDITOR)()
    expect(window.prompt).toHaveBeenCalledWith('URL', '')
  })
})
