import React from 'react'

import { Heading } from '@/components'

export default function ForbiddenPage() {
  return (
    <main className="container pt-40">
      <Heading className="text-center">
        You are not allowed to visit that page.
      </Heading>
    </main>
  )
}
