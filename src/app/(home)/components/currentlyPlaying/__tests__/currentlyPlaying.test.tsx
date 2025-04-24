import React from 'react'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'
import { renderWithProviders } from '@/test/helpers'
import { homeServer, mockEmptyHomeCarouselResponse } from '@/test/servers'

import { CurrentlyPlaying } from '..'

beforeAll(() => homeServer.listen())
afterEach(() => homeServer.resetHandlers())
afterAll(() => homeServer.close())

describe('<CurrentlyPlaying />', () => {
  it('should render the game', async () => {
    renderWithProviders(<CurrentlyPlaying />)
    expect(await screen.findByTestId(`game-${SUPER_METROID.id}`)).toBeVisible()
  })

  it('should not render when the game is blank', async () => {
    mockEmptyHomeCarouselResponse('currently_playing')
    const { container } = renderWithProviders(<CurrentlyPlaying />)
    await waitForElementToBeRemoved(() => screen.getByRole('alert'))
    expect(container).toBeEmptyDOMElement()
  })
})
