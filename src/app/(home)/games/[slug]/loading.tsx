import React from 'react'

import { Spinner } from '@/components'

import { PageWithNavbar } from '../../components'

export default function GameShowLoader() {
  return (
    <PageWithNavbar activeLinkTitle="Games">
      <Spinner className="pt-[20%]" size="lg" />
    </PageWithNavbar>
  )
}
