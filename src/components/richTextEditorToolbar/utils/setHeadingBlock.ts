import { $createHeadingNode } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import { $getSelection, $isRangeSelection } from 'lexical'

export function setHeadingBlock(level: 1 | 2 | 3 | 4 | 5 | 6) {
  return () => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return

    $setBlocksType(selection, () => $createHeadingNode(`h${level}`))
  }
}
