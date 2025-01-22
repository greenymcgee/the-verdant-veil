'use client'
import React from 'react'

import { LinkTo, Spinner } from '@/components'
import { usePageContext } from '@/context'

export function Breadcrumbs() {
  const { breadcrumbs } = usePageContext()

  if (!breadcrumbs.length) return <Spinner className="mb-4" size="xs" />

  return (
    <nav className="mb-4">
      <ul className="flex gap-1">
        {breadcrumbs.map(({ name, route }) => (
          <li key={route}>
            <LinkTo
              data-testid={`${name}-breadcrumb`}
              href={route}
              theme="secondary"
            >
              {name}
            </LinkTo>{' '}
            /
          </li>
        ))}
      </ul>
    </nav>
  )
}
