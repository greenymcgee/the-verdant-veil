import { Editor } from '@tiptap/react'

export function handleItalicClicked(editor: Editor) {
  return () => editor.chain().focus().toggleItalic().run()
}
