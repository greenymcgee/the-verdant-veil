import React, { PropsWithChildren } from 'react'

import { CurrentUserContextProvider } from './currentUser'
import { PageContextProvider } from './page'

interface ProvidersProps {
  initialPageContext?: PropsOf<typeof PageContextProvider>
}

export function Providers({
  children,
  initialPageContext,
}: PropsWithChildren<ProvidersProps>) {
  return (
    <PageContextProvider {...initialPageContext}>
      <CurrentUserContextProvider>{children}</CurrentUserContextProvider>
    </PageContextProvider>
  )
}
