'use client'
import React from 'react'

import { LinkTo } from '@/components'

interface Props {
  breadcrumbs: Breadcrumb[]
}

export function Breadcrumbs({ breadcrumbs }: Props) {
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
