import React, { HTMLAttributes } from 'react'

import { Button } from '@/components'

export function NewGameModalToggle(props: HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      data-testid="new-game-button"
      rightIcon="plus-thick"
      size="sm"
      variant="solid"
      {...props}
    >
      New
    </Button>
  )
}
