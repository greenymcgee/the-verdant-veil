import React from 'react'
import { screen } from '@testing-library/react'
import { mockUserAgent } from 'jest-useragent-mock'

import { BREAKPOINTS } from '@/constants'
import { SUPER_METROID } from '@/test/fixtures'
import { renderWithProviders } from '@/test/helpers'

import { BannerImage } from '..'

const { innerWidth } = window

afterEach(() => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: innerWidth,
    writable: true,
  })
})

describe('<BannerImage />', () => {
  it('should render the desktop version when user is on a desktop device', () => {
    mockUserAgent('Macintosh')
    renderWithProviders(<BannerImage bannerImage={SUPER_METROID.bannerImage} />)
    expect(screen.getByTestId('banner-image')).toHaveStyle(
      `background-image: url("${SUPER_METROID.bannerImage.url}")`,
    )
  })

  it('should render the mobile version the window width is less than medium', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: BREAKPOINTS.md - 1,
      writable: true,
    })
    renderWithProviders(<BannerImage bannerImage={SUPER_METROID.bannerImage} />)
    expect(screen.getByTestId('banner-image')).toHaveStyle(
      `background-image: url("${SUPER_METROID.bannerImage.mobile.url}")`,
    )
  })

  it("should not render a background image when a url isn't present", () => {
    renderWithProviders(
      <BannerImage bannerImage={{ mobile: { url: null }, url: null }} />,
    )
    expect(screen.getByTestId('banner-image').style.backgroundImage).toBe('')
  })

  it('should show loading state and icon when width is not yet available', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 0,
      writable: true,
    })
    renderWithProviders(<BannerImage bannerImage={SUPER_METROID.bannerImage} />)
    expect(screen.getByTestId('banner-image')).toHaveClass('animate-pulse')
    expect(screen.getByTestId('banner-image-icon')).toBeVisible()
  })
})
