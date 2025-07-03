import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import {
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  RangeSelection,
} from 'lexical'

function getURL(selection: RangeSelection) {
  const node = selection.anchor.getNode()
  const linkNode = $isLinkNode(node) ? node : node.getParent()
  const previousUrl = $isLinkNode(linkNode) ? linkNode.getURL() : ''
  return window.prompt('URL', previousUrl)
}

function prependMissingProtocol(url: string) {
  return url.includes('://') ? url : `https://${url}`
}

export function setLink(editor: LexicalEditor) {
  return () => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return

    const url = getURL(selection)
    if (url === null) return

    if (url === '') return editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)

    return editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
      rel: 'noopener noreferrer',
      target: '_blank',
      url: prependMissingProtocol(url),
    })
  }
}
