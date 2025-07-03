'use client'

import React, { HTMLAttributes, useCallback, useMemo } from 'react'
import { $generateHtmlFromNodes } from '@lexical/html'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import clsx from 'clsx'
import { EditorState, LexicalEditor } from 'lexical'

import {
  BASE_LINK_TO_CLASSNAME,
  LINK_TO_THEME_MAP,
  TRANSITION_STYLES,
} from '@/constants'
import { validateUrl } from '@/utils'

import { RichTextEditorToolbar } from '../richTextEditorToolbar'
import { setupEditorState } from './utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string
  content?: string
  onUpdate?: (html: string) => void
}

const THEME = {
  heading: {
    h2: 'mb-2',
    h3: 'mb-2',
    h4: 'mb-2',
    h5: 'mb-2',
    h6: 'mb-2',
  },
  link: clsx(BASE_LINK_TO_CLASSNAME, LINK_TO_THEME_MAP.primary),
}

export function RichTextEditor({
  className,
  content,
  onUpdate,
  ...options
}: Props) {
  const editorState = useMemo(() => setupEditorState(content), [content])

  const initialConfig: InitialConfigType = {
    editorState,
    namespace: 'RichTextEditor',
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      LinkNode,
      AutoLinkNode,
    ],
    onError(error: Error) {
      throw error
    },
    theme: THEME,
  }

  const handleChange = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      if (!onUpdate) return

      editorState.read(() => onUpdate($generateHtmlFromNodes(editor, null)))
    },
    [onUpdate],
  )

  return (
    <div
      className={clsx(
        'rich-text space-y-4 rounded-sm border border-neutral-600 p-4',
        className,
      )}
      {...options}
    >
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextEditorToolbar />
        <hr />
        <div className="relative">
          <RichTextPlugin
            ErrorBoundary={LexicalErrorBoundary}
            contentEditable={
              <ContentEditable
                className={clsx(
                  'hover:shadow-input-hover min-h-[150px] rounded-sm border border-neutral-400 p-3 text-neutral-700 transition-shadow outline-none',
                  TRANSITION_STYLES.inputHover,
                )}
                data-testid="rich-text-editor"
              />
            }
            placeholder={
              <div className="pointer-events-none absolute top-3 left-3 text-neutral-400">
                Enter some text...
              </div>
            }
          />
          <OnChangePlugin onChange={handleChange} />
          <HistoryPlugin />
          <LinkPlugin validateUrl={validateUrl} />
        </div>
      </LexicalComposer>
    </div>
  )
}
