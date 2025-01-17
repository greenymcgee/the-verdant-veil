import React, { PropsWithChildren } from 'react'

import { AdminGamesClientSide } from './components'

export default function AdminGamesLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AdminGamesClientSide />
      {children}
    </>
  )
}
