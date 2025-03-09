'use client'

import React, { useEffect } from 'react'

import { Button, Card, Heading } from '@/components'
import { logger } from '@/modules'

interface Props {
  error: Error & { digest?: string }
  reset: VoidFunction
}

export default function AdminErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    logger.error(error, error.message)
  })

  return (
    <Card>
      <header className="mb-8 pb-4">
        <Heading className="mb-4">Whoops! Something went wrong</Heading>
        <hr />
      </header>
      <Button onClick={reset} text="Try Again" />
    </Card>
  )
}
