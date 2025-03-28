'use client'
import React from 'react'

import { LinkTo } from '@/components'
import { ROUTES } from '@/constants'

interface Props {
  slug: Game['slug']
}

export function BackToAdmin({ slug }: Props) {
  return (
    <LinkTo
      href={ROUTES.adminGame(slug)}
      leftIcon="chevron-left"
      size="sm"
      text="Back to Admin"
      theme="secondary"
      variant="solid"
    />
  )
}
