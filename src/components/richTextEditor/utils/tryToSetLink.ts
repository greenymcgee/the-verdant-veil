import { Editor } from '@tiptap/react'
import toast from 'react-hot-toast'

export function tryToSetLink(editor: Editor, url: string) {
  try {
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  } catch (error) {
    toast.error((error as Error)?.message)
  }
}
