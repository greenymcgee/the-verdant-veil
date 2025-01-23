'use client'

import React, { useEffect } from 'react'

import { Button, Card } from '@/components'
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
        <h1 className="mb-4">Whoops! Something went wrong</h1>
        <hr />
      </header>
      <Button onClick={reset} text="Try Again" />
    </Card>
  )
}
