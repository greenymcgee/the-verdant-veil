import { Editor } from '@tiptap/react'

interface EditorState {
  isBoldActive: boolean
  isH2Active: boolean
  isH3Active: boolean
  isH4Active: boolean
  isH5Active: boolean
  isH6Active: boolean
  isItalicActive: boolean
  isLinkActive: boolean
  isUnsetLinkActive: boolean
}

export function getEditorState(editor: Editor | null) {
  if (!editor) return {} as EditorState

  return {
    isBoldActive: editor.isActive('bold'),
    isH2Active: editor.isActive('heading', { level: 2 }),
    isH3Active: editor.isActive('heading', { level: 3 }),
    isH4Active: editor.isActive('heading', { level: 4 }),
    isH5Active: editor.isActive('heading', { level: 5 }),
    isH6Active: editor.isActive('heading', { level: 6 }),
    isItalicActive: editor.isActive('italic'),
    isLinkActive: editor.isActive('link'),
    isUnsetLinkActive: !editor.isActive('link'),
  }
}
