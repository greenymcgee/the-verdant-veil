import React, { PropsWithChildren } from 'react'
import { render, renderHook } from '@testing-library/react'
import { SWRConfig } from 'swr'

import { Providers } from '@/context'

type Options = SecondParameterOf<typeof render> & PropsOf<typeof Providers>

export function renderHookWithProviders<Result, Props>(
  renderFunction: (initialProps: Props) => Result,
  { initialPageContext, wrapper: OptionalWrapper, ...rest }: Options = {},
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Providers initialPageContext={initialPageContext}>
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
          {OptionalWrapper ? (
            <OptionalWrapper>{children}</OptionalWrapper>
          ) : (
            children
          )}
        </SWRConfig>
      </Providers>
    )
  }
  return renderHook<Result, Props>(renderFunction, {
    wrapper: Wrapper,
    ...rest,
  })
}
