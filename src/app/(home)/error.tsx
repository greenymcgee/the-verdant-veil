'use client'

import React, { useEffect } from 'react'

import { Button } from '@/components'
import { logger } from '@/lib'

import { HomeErrorBoundary, PageWithNavbar } from './components'

interface Props {
  error: Error & { digest?: string }
  reset: VoidFunction
}

export default function HomeLayoutErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    logger.error(error, error.message)
  })

  return (
    <PageWithNavbar activeLinkTitle="Home">
      <HomeErrorBoundary
        actionBar={<Button onClick={reset} text="Try again" />}
        heading="Blast! Something went wrong"
        status={500}
        subtitle="An error occurred. Check back soon to continue the journey."
      />
    </PageWithNavbar>
  )
}
