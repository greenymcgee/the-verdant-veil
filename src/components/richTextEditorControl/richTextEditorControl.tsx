import React from 'react'

import { Button } from '../button'

interface Props {
  active: boolean
  onClick: VoidFunction
  text: string
}

export function RichTextEditorControl({ active, onClick, text }: Props) {
  return (
    <Button
      onClick={onClick}
      size="xs"
      theme="neutral"
      variant={active ? 'solid' : 'outline'}
    >
      {text}
    </Button>
  )
}
