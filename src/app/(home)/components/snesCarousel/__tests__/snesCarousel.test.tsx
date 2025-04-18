import React from 'react'
import { render, screen } from '@testing-library/react'

import { ROUTES } from '@/constants'
import { GET_HOME_CAROUSEL_RESPONSE_DATA } from '@/test/fixtures'
import { homeServer } from '@/test/servers'

import { SNESCarousel } from '..'

beforeAll(() => homeServer.listen())
afterEach(() => homeServer.resetHandlers())
afterAll(() => homeServer.close())

describe('<SNESCarousel />', () => {
  it('should render a header', () => {
    render(<SNESCarousel />)
    expect(screen.getByText('SNES')).toBeVisible()
  })

  it('should render a "See all" link', () => {
    render(<SNESCarousel />)
    expect(screen.getByText('See all')).toHaveAttribute(
      'href',
      `${ROUTES.games}?platforms[]=snes`,
    )
  })

  it.each(GET_HOME_CAROUSEL_RESPONSE_DATA.carousel.games)(
    'should render games',
    async ({ id }) => {
      render(<SNESCarousel />)
      expect(await screen.findByTestId(`game-slide-${id}`)).toBeVisible()
    },
  )
})
