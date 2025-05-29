import React, { PropsWithChildren } from 'react'

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
      {children}
    </PageContextProvider>
  )
}
