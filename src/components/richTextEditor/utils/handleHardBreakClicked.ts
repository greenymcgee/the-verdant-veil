import { Editor } from '@tiptap/react'

export function handleHardBreakClicked(editor: Editor) {
  return () => editor.chain().focus().setHardBreak().run()
}
