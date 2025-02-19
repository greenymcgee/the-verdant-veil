import React from 'react'
import { render, screen } from '@testing-library/react'
import { clear, mockUserAgent } from 'jest-useragent-mock'

import { PageContextProvider, usePageContext } from '..'

afterEach(() => clear())

function Child() {
  const { isIOSDevice } = usePageContext()

  return <div>{isIOSDevice ? 'Is iOS Device' : 'Not iOS Device'}</div>
}

describe('<PageContextProvider />', () => {
  describe('isIOSDevice', () => {
    it('should set isIOSDevice', () => {
      mockUserAgent('iPhone')
      render(
        <PageContextProvider>
          <Child />
        </PageContextProvider>,
      )
      expect(screen.getByText('Is iOS Device')).toBeVisible()
    })
  })
})
