import { Editor } from '@tiptap/react'

import { tryToSetLink } from './tryToSetLink'

export function handleSetLinkClicked(editor: Editor) {
  return () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    if (url === null) return

    if (url === '') {
      return editor.chain().focus().extendMarkRange('link').unsetLink().run()
    }

    tryToSetLink(editor, url)
  }
}
