import { $generateNodesFromDOM } from '@lexical/html'
import { $isLinkNode } from '@lexical/link'
import { $getRoot, LexicalEditor } from 'lexical'

export function setupEditorState(content: string | undefined) {
  if (!content || typeof window === 'undefined') return

  return (editor: LexicalEditor) => {
    const parser = new DOMParser()
    const dom = parser.parseFromString(content, 'text/html')
    const nodes = $generateNodesFromDOM(editor, dom)
    const root = $getRoot()
    root.clear()
    root.append(...nodes)
    root.getChildren().forEach((node) => {
      if (!$isLinkNode(node)) return

      node.setTarget('_blank')
      node.setRel('noopener noreferrer')
    })
  }
}
