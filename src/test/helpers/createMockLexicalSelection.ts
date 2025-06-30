import { LexicalNode, RangeSelection } from 'lexical'

interface Options {
  elementTag?: string
  formatResults?: { bold?: boolean; italic?: boolean }
  nodeKey?: string
  parentNode?: LexicalNode | null | undefined
}

type FormatKey = keyof Options['formatResults']

export function createMockLexicalSelection({
  formatResults = {},
  elementTag = 'p',
  nodeKey = 'test-key',
  parentNode,
}: Options = {}): RangeSelection {
  const anchorNode = {
    getKey: vi.fn().mockReturnValue(nodeKey),
    getParent: vi.fn().mockReturnValue(parentNode),
    getTopLevelElementOrThrow: vi.fn().mockReturnValue({
      getTag: vi.fn().mockReturnValue(elementTag),
    }),
  } as unknown as LexicalNode

  return {
    anchor: { getNode: vi.fn().mockReturnValue(anchorNode) },
    getStartEndPoints: vi.fn().mockReturnValue([
      { getNode: vi.fn(), offset: 0 },
      { getNode: vi.fn(), offset: 0 },
    ]),
    hasFormat: vi
      .fn()
      .mockImplementation(
        (format: FormatKey) => formatResults[format] || false,
      ),
  } as unknown as RangeSelection
}
