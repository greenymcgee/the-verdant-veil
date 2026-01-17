'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { TOGGLE_LINK_COMMAND } from '@lexical/link'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import { FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND } from 'lexical'

import { RichTextEditorControl } from '../richTextEditorControl'
import type { RichTextEditorToolbarState } from './types'
import {
  setHeadingBlock,
  setLineBreak,
  setLink,
  updateToolbarState,
} from './utils'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

const DEFAULT_STATE: RichTextEditorToolbarState = {
  isBold: false,
  isH2: false,
  isH3: false,
  isH4: false,
  isH5: false,
  isH6: false,
  isItalic: false,
  isLink: false,
} as const

export function RichTextEditorToolbar() {
  const [editor] = useLexicalComposerContext()
  const [state, setState] = useState<RichTextEditorToolbarState>(DEFAULT_STATE)

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbarState(setState)
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbarState(setState)
          return false
        },
        1,
      ),
    )
  }, [editor])

  const formatHeading = useCallback(
    (level: HeadingLevel) => {
      editor.update(setHeadingBlock(level))
    },
    [editor],
  )

  const formatBold = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
  }, [editor])

  const formatItalic = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
  }, [editor])

  const insertLineBreak = useCallback(
    () => editor.update(setLineBreak),
    [editor],
  )

  const insertLink = useCallback(() => editor.update(setLink(editor)), [editor])

  const removeLink = useCallback(
    () => editor.dispatchCommand(TOGGLE_LINK_COMMAND, null),
    [editor],
  )

  return (
    <div
      className="flex max-w-full gap-2 overflow-x-auto"
      data-testid="rich-text-menu"
    >
      <RichTextEditorControl
        active={state.isH2}
        onClick={() => formatHeading(2)}
        text="H2"
      />
      <RichTextEditorControl
        active={state.isH3}
        onClick={() => formatHeading(3)}
        text="H3"
      />
      <RichTextEditorControl
        active={state.isH4}
        onClick={() => formatHeading(4)}
        text="H4"
      />
      <RichTextEditorControl
        active={state.isH5}
        onClick={() => formatHeading(5)}
        text="H5"
      />
      <RichTextEditorControl
        active={state.isH6}
        onClick={() => formatHeading(6)}
        text="H6"
      />
      <RichTextEditorControl
        active={state.isBold}
        onClick={formatBold}
        text="Bold"
      />
      <RichTextEditorControl
        active={state.isItalic}
        onClick={formatItalic}
        text="Italic"
      />
      <RichTextEditorControl
        active={false}
        onClick={insertLineBreak}
        text="Hard Break"
      />
      <RichTextEditorControl
        active={state.isLink}
        onClick={insertLink}
        text="Set Link"
      />
      <RichTextEditorControl
        active={!state.isLink}
        onClick={removeLink}
        text="Unset Link"
      />
    </div>
  )
}
