import React from 'react'

import { LinkTo } from '@/components'
import { ROUTES } from '@/constants'

import { HomeErrorBoundary, PageWithNavbar } from './(home)/components'

export default function NotFoundPage() {
  return (
    <PageWithNavbar activeLinkTitle="Home">
      <HomeErrorBoundary
        actionBar={
          <LinkTo
            href={ROUTES.home}
            leftIcon="chevron-left"
            text="Back to Home"
            variant="solid"
          />
        }
        heading="Whoops, I couldn't find that one"
        status={404}
        subtitle="The page you're looking for could not be found"
      />
    </PageWithNavbar>
  )
}
