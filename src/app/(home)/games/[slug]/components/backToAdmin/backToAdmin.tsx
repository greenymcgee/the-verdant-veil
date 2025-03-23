'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

import { LinkTo } from '@/components'
import { ROUTES } from '@/constants'

interface Props {
  slug: Game['slug']
}

export function BackToAdmin({ slug }: Props) {
  const pathname = usePathname()

  if (!pathname.includes('preview')) return null

  return (
    <LinkTo
      className="mb-8"
      href={ROUTES.adminGame(slug)}
      leftIcon="chevron-left"
      size="sm"
      text="Back to Admin"
      theme="secondary"
      variant="solid"
    />
  )
}
