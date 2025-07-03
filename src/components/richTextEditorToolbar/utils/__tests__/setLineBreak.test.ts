import {
  $createLineBreakNode,
  $getSelection,
  $insertNodes,
  $isRangeSelection,
} from 'lexical'

import { createMockLexicalSelection } from '@/test/helpers'

import { setLineBreak } from '..'

vi.mock('lexical', async () => {
  const actual = await vi.importActual('lexical')
  return {
    ...actual,
    $createLineBreakNode: vi.fn(),
    $getSelection: vi.fn(),
    $insertNodes: vi.fn(),
    $isRangeSelection: vi.fn(),
  }
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('setLineBreak', () => {
  it('should do nothing when selection is not a range selection', () => {
    vi.mocked($isRangeSelection).mockReturnValue(false)
    setLineBreak()
    expect($createLineBreakNode).not.toHaveBeenCalled()
  })

  it('should create a line break when the selection is in range', () => {
    const selection = createMockLexicalSelection()
    vi.mocked($getSelection).mockReturnValue(selection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    setLineBreak()
    expect($insertNodes).toHaveBeenCalledTimes(1)
    expect($createLineBreakNode).toHaveBeenCalledTimes(1)
  })
})
