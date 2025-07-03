import { $createHeadingNode } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import { $getSelection, $isRangeSelection } from 'lexical'

import { createMockLexicalSelection } from '@/test/helpers'

import { setHeadingBlock } from '..'

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
  return { ...actual, $createHeadingNode: vi.fn() }
})

vi.mock('@lexical/selection', async () => {
  const actual = await vi.importActual('@lexical/selection')
  return { ...actual, $setBlocksType: vi.fn() }
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('setHeadingBlock', () => {
  it('should do nothing when selection is not a range selection', () => {
    vi.mocked($isRangeSelection).mockReturnValue(false)
    setHeadingBlock(1)()
    expect($setBlocksType).not.toHaveBeenCalled()
  })

  it('should set the block type of the current selection to the given heading level', () => {
    const selection = createMockLexicalSelection()
    vi.mocked($getSelection).mockReturnValue(selection)
    vi.mocked($isRangeSelection).mockReturnValue(true)
    vi.mocked($setBlocksType).mockImplementationOnce((_, lambda) => lambda())
    setHeadingBlock(1)()
    expect($setBlocksType).toHaveBeenCalledWith(selection, expect.any(Function))
    expect($createHeadingNode).toHaveBeenCalledWith('h1')
  })
})
