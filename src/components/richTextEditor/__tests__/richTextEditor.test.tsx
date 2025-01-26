import React from 'react'
import { render, screen } from '@testing-library/react'

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
})
