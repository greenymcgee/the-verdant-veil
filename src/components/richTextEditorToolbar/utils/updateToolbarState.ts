import { Dispatch, SetStateAction } from 'react'
import { $isLinkNode } from '@lexical/link'
import { $isHeadingNode } from '@lexical/rich-text'
import { $getSelection, $isRangeSelection, LexicalNode } from 'lexical'

import { RichTextEditorToolbarState } from '../types'

function getRootElement(anchorNode: LexicalNode) {
  if (anchorNode.getKey() === 'root') return anchorNode

  return anchorNode.getTopLevelElementOrThrow()
}

export function updateToolbarState(
  setState: Dispatch<SetStateAction<RichTextEditorToolbarState>>,
) {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return

  const anchorNode = selection.anchor.getNode()
  const rootElement = getRootElement(anchorNode)
  setState({
    isBold: selection.hasFormat('bold'),
    isH2: $isHeadingNode(rootElement) && rootElement.getTag() === 'h2',
    isH3: $isHeadingNode(rootElement) && rootElement.getTag() === 'h3',
    isH4: $isHeadingNode(rootElement) && rootElement.getTag() === 'h4',
    isH5: $isHeadingNode(rootElement) && rootElement.getTag() === 'h5',
    isH6: $isHeadingNode(rootElement) && rootElement.getTag() === 'h6',
    isItalic: selection.hasFormat('italic'),
    isLink: $isLinkNode(anchorNode) || $isLinkNode(anchorNode.getParent()),
  })
}
