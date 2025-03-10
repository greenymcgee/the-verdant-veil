import React from 'react'

import { Heading } from '@/components'

export default function ForbiddenPage() {
  return (
    <main className="container pt-40">
      <Heading
        className="bg-neutral-900 text-center"
        classNameOverrides={{ color: 'text-white' }}
      >
        You are not allowed to visit that page.
      </Heading>
    </main>
  )
}
