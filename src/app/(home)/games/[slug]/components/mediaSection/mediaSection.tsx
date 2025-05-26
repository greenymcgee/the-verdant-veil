import React, { PropsWithChildren } from 'react'

import { Heading } from '@/components'

interface Props extends PropsWithChildren {
  heading: 'Artworks' | 'Screenshots' | 'Videos'
  itemCount: number
}

export function MediaSection({ children, heading, itemCount }: Props) {
  if (!itemCount) return null

  return (
    <section
      className="mb-8 last:mb-0"
      data-testid={`game-${heading.toLowerCase()}`}
    >
      <Heading as="h2" className="mb-2">
        {heading}
      </Heading>
      <ul className="grid gap-6 sm:grid-cols-2">{children}</ul>
    </section>
  )
}
