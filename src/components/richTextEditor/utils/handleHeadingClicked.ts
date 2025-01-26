import { Editor } from '@tiptap/react'

export function handleHeadingClicked(editor: Editor, level: 2 | 3 | 4 | 5 | 6) {
  return () => editor.chain().focus().setHeading({ level }).run()
}
