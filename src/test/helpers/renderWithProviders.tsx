import React, { PropsWithChildren, ReactElement } from 'react'
import { render } from '@testing-library/react'

import { Providers } from '@/context'

type Options = SecondParameterOf<typeof render> & PropsOf<typeof Providers>

export function renderWithProviders(
  jsx: ReactElement,
  { initialPageContext, wrapper: OptionalWrapper, ...rest }: Options = {},
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Providers initialPageContext={initialPageContext}>
        {OptionalWrapper ? (
          <OptionalWrapper>{children}</OptionalWrapper>
        ) : (
          children
        )}
      </Providers>
    )
  }
  return render(jsx, { wrapper: Wrapper, ...rest })
}
