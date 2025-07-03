import {
  $createLineBreakNode,
  $getSelection,
  $insertNodes,
  $isRangeSelection,
} from 'lexical'

export function setLineBreak() {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return

  $insertNodes([$createLineBreakNode()])
}
