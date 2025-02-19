'use client'
import React from 'react'

import { LinkTo } from '@/components'

interface Props {
  breadcrumbs: Breadcrumb[]
}

export function Breadcrumbs({ breadcrumbs }: Props) {
  return (
    <nav className="mb-4">
      <ul className="flex max-w-full gap-1 overflow-x-auto whitespace-nowrap">
        {breadcrumbs.map(({ name, route }, index) => (
          <li key={route}>
            <LinkTo
              data-testid={`${name}-breadcrumb`}
              href={route}
              theme="secondary"
            >
              {name}
            </LinkTo>{' '}
            {index === breadcrumbs.length - 1 ? null : '/'}
          </li>
        ))}
      </ul>
    </nav>
  )
}
