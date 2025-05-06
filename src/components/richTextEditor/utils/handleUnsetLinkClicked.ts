import { Editor } from '@tiptap/react'

export function handleUnsetLinkClicked(editor: Editor) {
  return () => editor.chain().focus().unsetLink().run()
}
