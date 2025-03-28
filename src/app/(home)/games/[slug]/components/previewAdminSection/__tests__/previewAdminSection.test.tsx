import React from 'react'
import { render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { gameFactory } from '@/test/factories'
import { SUPER_METROID } from '@/test/fixtures'
import { gamesServer } from '@/test/servers'

import { PreviewAdminSection } from '..'

beforeAll(() => gamesServer.listen())
afterEach(() => {
  mockRouter.push('/')
  gamesServer.resetHandlers()
})
afterAll(() => gamesServer.close())

describe('<PreviewAdminSection />', () => {
  it('should not render if the route does not include preview', () => {
    const { container } = render(<PreviewAdminSection game={SUPER_METROID} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render the unpublish form if the game is published', () => {
    mockRouter.push('/preview')
    render(<PreviewAdminSection game={SUPER_METROID} />)
    expect(screen.getByTestId('unpublish-game-form')).toBeVisible()
  })

  it('should render the publish form if the game is unpublished', () => {
    mockRouter.push('/preview')
    render(
      <PreviewAdminSection game={gameFactory.build({ published: false })} />,
    )
    expect(screen.getByTestId('publish-game-form')).toBeVisible()
  })
})
