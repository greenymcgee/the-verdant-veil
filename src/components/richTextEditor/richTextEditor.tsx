'use client'

import React from 'react'
import {
  Editor,
  EditorContent,
  EditorContentProps,
  EditorEvents,
  useEditor,
  useEditorState,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import clsx from 'clsx'

import { TRANSITION_STYLES } from '@/constants'

import { RichTextEditorControl } from '../richTextEditorControl'
import {
  getEditorState,
  handleBoldClicked,
  handleHeadingClicked,
} from './utils'

interface Props extends Omit<EditorContentProps, 'editor'> {
  onUpdate?: (event: EditorEvents['update']) => void
}

function handleItalicClicked(editor: Editor) {
  return () => editor.chain().focus().toggleItalic().run()
}

export function RichTextEditor({
  className,
  content,
  onUpdate,
  ...options
}: Props) {
  const editor = useEditor({
    content,
    extensions: [StarterKit],
    immediatelyRender: false,
    onUpdate,
  })

  const editorState = useEditorState({
    editor,
    selector: (context) => getEditorState(context.editor),
  })

  if (!editor || !editorState) return null

  return (
    <div className="space-y-4 rounded border border-neutral-600 p-4">
      <div className="flex gap-2" data-testid="rich-text-menu">
        <RichTextEditorControl
          active={editorState.isH2Active}
          onClick={handleHeadingClicked(editor, 2)}
          text="H2"
        />
        <RichTextEditorControl
          active={editorState.isH3Active}
          onClick={handleHeadingClicked(editor, 3)}
          text="H3"
        />
        <RichTextEditorControl
          active={editorState.isH4Active}
          onClick={handleHeadingClicked(editor, 4)}
          text="H4"
        />
        <RichTextEditorControl
          active={editorState.isH5Active}
          onClick={handleHeadingClicked(editor, 5)}
          text="H5"
        />
        <RichTextEditorControl
          active={editorState.isH6Active}
          onClick={handleHeadingClicked(editor, 6)}
          text="H6"
        />
        <RichTextEditorControl
          active={editorState.isBoldActive}
          onClick={handleBoldClicked(editor)}
          text="Bold"
        />
        <RichTextEditorControl
          active={editorState.isItalicActive}
          onClick={handleItalicClicked(editor)}
          text="Italic"
        />
      </div>
      <hr />
      <EditorContent
        className={clsx(
          'rounded border border-neutral-400 text-neutral-700 transition-shadow hover:shadow-input-hover',
          TRANSITION_STYLES.inputHover,
          className,
        )}
        data-testid="rich-text-editor"
        editor={editor}
        {...options}
      />
    </div>
  )
}
