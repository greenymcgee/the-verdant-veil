import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { DARK_SOULS, SUPER_METROID } from '@/test/fixtures'
import { gamesServer, mockUnpublishableGameFailure } from '@/test/servers'

import { PreviewAdminSection } from '..'

beforeAll(() => gamesServer.listen())
afterEach(() => {
  act(() => {
    mockRouter.push('/')
  })
  gamesServer.resetHandlers()
})
afterAll(() => gamesServer.close())

describe('<PreviewAdminSection />', () => {
  it('should not render if the route does not include preview', () => {
    const { container } = render(<PreviewAdminSection game={SUPER_METROID} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render the unpublish form if the game is published', () => {
    act(() => {
      mockRouter.push('/preview')
    })
    render(<PreviewAdminSection game={SUPER_METROID} />)
    expect(screen.getByTestId('unpublish-game-form')).toBeVisible()
  })

  it('should render the publish form if the game is unpublished', () => {
    act(() => {
      mockRouter.push('/preview')
    })
    render(<PreviewAdminSection game={DARK_SOULS} />)
    expect(screen.getByTestId('publish-game-form')).toBeVisible()
  })

  it('should handle unpublishable errors', async () => {
    act(() => {
      mockRouter.push('/preview')
    })
    const unpublishableReasons = mockUnpublishableGameFailure(DARK_SOULS.slug)
    render(<PreviewAdminSection game={DARK_SOULS} />)
    fireEvent.click(screen.getByText('Publish'))
    await screen.findByText(unpublishableReasons.at(0) as string)
    unpublishableReasons.forEach((reason) =>
      expect(screen.getByText(reason)).toBeVisible(),
    )
  })
})
