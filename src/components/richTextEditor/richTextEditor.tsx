/* eslint-disable import/no-named-as-default */
'use client'

import React from 'react'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import Codeblock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import History from '@tiptap/extension-history'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Strike from '@tiptap/extension-strike'
import Text from '@tiptap/extension-text'
import {
  EditorContent,
  EditorContentProps,
  EditorEvents,
  useEditor,
  useEditorState,
} from '@tiptap/react'
import clsx from 'clsx'

import {
  BASE_LINK_TO_CLASSNAME,
  LINK_TO_THEME_MAP,
  TRANSITION_STYLES,
} from '@/constants'

import { RichTextEditorControl } from '../richTextEditorControl'
import {
  getEditorState,
  handleBoldClicked,
  handleHardBreakClicked,
  handleHeadingClicked,
  handleItalicClicked,
  handleSetLinkClicked,
  handleUnsetLinkClicked,
  isAllowedUri,
} from './utils'

interface Props extends Omit<EditorContentProps, 'editor'> {
  onUpdate?: (event: EditorEvents['update']) => void
}

export function RichTextEditor({
  className,
  content,
  onUpdate,
  ...options
}: Props) {
  const editor = useEditor({
    content,
    extensions: [
      Blockquote,
      Bold,
      BulletList,
      Code,
      Codeblock,
      Document,
      Dropcursor,
      Gapcursor,
      HardBreak,
      Heading.configure({ HTMLAttributes: { class: 'mb-2' } }),
      History,
      HorizontalRule,
      Italic,
      Link.configure({
        HTMLAttributes: {
          class: clsx(BASE_LINK_TO_CLASSNAME, LINK_TO_THEME_MAP.primary),
          target: '_blank',
        },
        autolink: true,
        defaultProtocol: 'https',
        isAllowedUri,
        protocols: ['http', 'https'],
      }),
      ListItem,
      OrderedList,
      Paragraph,
      Strike,
      Text,
    ],
    immediatelyRender: false,
    onUpdate,
  })

  const editorState = useEditorState({
    editor,
    selector: (context) => getEditorState(context.editor),
  })

  if (!editor || !editorState) return null

  return (
    <div
      className={clsx(
        'rich-text space-y-4 rounded-sm border border-neutral-600 p-4',
        className,
      )}
    >
      <div
        className="flex max-w-full gap-2 overflow-x-auto"
        data-testid="rich-text-menu"
      >
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
        <RichTextEditorControl
          active
          onClick={handleHardBreakClicked(editor)}
          text="Hard Break"
        />
        <RichTextEditorControl
          active={editorState.isLinkActive}
          onClick={handleSetLinkClicked(editor)}
          text="Set Link"
        />
        <RichTextEditorControl
          active={editorState.isUnsetLinkActive}
          onClick={handleUnsetLinkClicked(editor)}
          text="Unset Link"
        />
      </div>
      <hr />
      <EditorContent
        className={clsx(
          'hover:shadow-input-hover rounded-sm border border-neutral-400 text-neutral-700 transition-shadow',
          TRANSITION_STYLES.inputHover,
        )}
        data-testid="rich-text-editor"
        editor={editor}
        {...options}
      />
    </div>
  )
}

/* eslint-enable import/no-named-as-default */
