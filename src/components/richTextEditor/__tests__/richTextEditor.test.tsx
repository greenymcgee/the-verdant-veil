import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { sleep } from '@/test/helpers'

import { RichTextEditor } from '..'

describe('<RichTextEditor />', () => {
  it('should render the editor', () => {
    render(<RichTextEditor />)
    expect(screen.getByTestId('rich-text-editor')).toBeVisible()
  })

  it('should render the menu', () => {
    render(<RichTextEditor />)
    expect(screen.getByTestId('rich-text-menu')).toBeVisible()
  })

  it('should call onUpdate with HTML when the content changes', async () => {
    const onUpdate = vi.fn()
    render(<RichTextEditor onUpdate={onUpdate} />)
    const editor = screen.getByTestId('rich-text-editor')
    await userEvent.click(editor)
    await userEvent.tab()
    fireEvent.input(editor, { data: 'test' })
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith(expect.stringContaining('test'))
    })
  })

  it('should do nothing when an onUpdate is not present', async () => {
    render(<RichTextEditor />)
    const editor = screen.getByTestId('rich-text-editor')
    await userEvent.click(editor)
    await userEvent.tab()
    fireEvent.input(editor, { data: 'test' })
    await sleep()
    expect.anything()
  })
})
