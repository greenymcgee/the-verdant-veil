import React from 'react'
import { render, screen } from '@testing-library/react'

import { RichTextEditorControl } from '..'

const PROPS: PropsOf<typeof RichTextEditorControl> = {
  active: false,
  onClick: vi.fn(),
  text: 'H2',
}

describe('<RichTextEditorControl />', () => {
  it('should render', () => {
    render(<RichTextEditorControl {...PROPS} />)
    expect(screen.getByText('H2')).toBeVisible()
  })
})
