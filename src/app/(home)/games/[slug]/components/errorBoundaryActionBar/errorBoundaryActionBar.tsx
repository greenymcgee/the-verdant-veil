import React from 'react'

import { LinkTo } from '@/components'
import { ROUTES } from '@/constants'

export function ErrorBoundaryActionBar() {
  return (
    <LinkTo href={ROUTES.home} leftIcon="chevron-left" text="Head back home" />
  )
}
