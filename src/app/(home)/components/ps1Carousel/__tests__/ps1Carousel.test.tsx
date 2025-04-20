import React from 'react'
import { render, screen } from '@testing-library/react'

import { ROUTES } from '@/constants'
import { GET_PS1_CAROUSEL_RESPONSE_DATA } from '@/test/fixtures'
import { homeServer } from '@/test/servers'

import { PS1Carousel } from '..'

beforeAll(() => homeServer.listen())
afterEach(() => homeServer.resetHandlers())
afterAll(() => homeServer.close())

describe('<PS1Carousel />', () => {
  it('should render a header', () => {
    render(<PS1Carousel />)
    expect(screen.getByText('PS1')).toBeVisible()
  })

  it('should render a "See all" link', () => {
    render(<PS1Carousel />)
    expect(screen.getByText('See all')).toHaveAttribute(
      'href',
      ROUTES.platform('ps'),
    )
  })

  it.each(GET_PS1_CAROUSEL_RESPONSE_DATA.carousel.games)(
    'should render games',
    async ({ id }) => {
      render(<PS1Carousel />)
      expect(await screen.findByTestId(`game-slide-${id}`)).toBeVisible()
    },
  )
})
