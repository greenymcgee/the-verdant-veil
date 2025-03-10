import React, { PropsWithChildren, ReactElement } from 'react'
import { render } from '@testing-library/react'
import { clear, mockUserAgent } from 'jest-useragent-mock'
import { SWRConfig } from 'swr'

import { Providers } from '@/context'

type Options = SecondParameterOf<typeof render> & PropsOf<typeof Providers>

beforeEach(() => mockUserAgent('iPhone'))
afterEach(() => clear())

export function renderWithProviders(
  jsx: ReactElement,
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
  return render(jsx, { wrapper: Wrapper, ...rest })
}
