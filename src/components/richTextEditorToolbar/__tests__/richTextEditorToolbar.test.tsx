import React, { PropsWithChildren } from 'react'
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
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { fireEvent, render, screen } from '@testing-library/react'

import { RichTextEditorToolbar } from '..'

const initialConfig: InitialConfigType = {
  namespace: 'RichTextEditor',
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    LinkNode,
    AutoLinkNode,
  ],
  onError: (error: Error) => {
    throw error
  },
}

function TestWrapper({ children }: PropsWithChildren) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<div className="editor-placeholder">Enter text...</div>}
        />
        <HistoryPlugin />
        <LinkPlugin />
        {children}
      </div>
    </LexicalComposer>
  )
}

describe('<RichTextEditorToolbar />', () => {
  it.each(['H2', 'H3', 'H4', 'H5', 'H6'])(
    'should render heading controls',
    (heading) => {
      render(<RichTextEditorToolbar />, { wrapper: TestWrapper })
      const control = screen.getByText(heading)
      expect(control).toBeVisible()
      expect(() => fireEvent.click(control)).not.toThrow()
    },
  )

  it('should render text formatting controls', () => {
    render(<RichTextEditorToolbar />, { wrapper: TestWrapper })
    expect(screen.getByText('Bold')).toBeInTheDocument()
    expect(screen.getByText('Italic')).toBeInTheDocument()
  })

  it('should render utility controls', () => {
    render(<RichTextEditorToolbar />, { wrapper: TestWrapper })
    expect(screen.getByText('Hard Break')).toBeInTheDocument()
  })

  it('should render link controls', () => {
    render(<RichTextEditorToolbar />, { wrapper: TestWrapper })
    expect(screen.getByText('Set Link')).toBeInTheDocument()
    expect(screen.getByText('Unset Link')).toBeInTheDocument()
  })

  it.each(['Bold', 'Italic'])('should have enabled text controls', (text) => {
    render(<RichTextEditorToolbar />, { wrapper: TestWrapper })
    const control = screen.getByText(text)
    expect(control).toBeEnabled()
    expect(() => fireEvent.click(control)).not.toThrow()
  })

  it.each(['Hard Break'])('should have enabled utility controls', (text) => {
    render(<RichTextEditorToolbar />, { wrapper: TestWrapper })
    const control = screen.getByText(text)
    expect(control).toBeEnabled()
    expect(() => fireEvent.click(control)).not.toThrow()
  })

  it.each(['Set Link', 'Unset Link'])(
    'should have enabled link controls',
    (text) => {
      render(<RichTextEditorToolbar />, { wrapper: TestWrapper })
      const control = screen.getByText(text)
      expect(control).toBeEnabled()
      expect(() => fireEvent.click(control)).not.toThrow()
    },
  )
})
