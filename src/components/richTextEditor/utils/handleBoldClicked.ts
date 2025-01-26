import { Editor } from '@tiptap/react'

export function handleBoldClicked(editor: Editor) {
  return () => editor.chain().focus().toggleBold().run()
}
