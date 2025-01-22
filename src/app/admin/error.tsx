'use client'

import React from 'react'

import { Button, Card } from '@/components'

interface Props {
  error: Error & { digest?: string }
  reset: VoidFunction
}

export default function AdminErrorBoundary({ error, reset }: Props) {
  return (
    <Card>
      <header className="mb-8">
        <h1 className="mb-2 text-heading-lg">Whoops! Something went wrong</h1>
        <p>{error.message}</p>
      </header>
      <Button onClick={reset} text="Try Again" />
    </Card>
  )
}
