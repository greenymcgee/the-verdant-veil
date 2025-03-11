import React from 'react'
import { render, screen } from '@testing-library/react'
import { mockUserAgent } from 'jest-useragent-mock'

import { SUPER_METROID } from '@/test/fixtures'

import { BannerImage } from '..'

describe('<BannerImage />', () => {
  it('should render the desktop version when user is on a desktop device', () => {
    mockUserAgent('Macbook')
    render(<BannerImage bannerImage={SUPER_METROID.bannerImage} />)
    expect(screen.getByTestId('banner-image')).toHaveStyle({
      backgroundImage: SUPER_METROID.bannerImage.url,
    })
  })

  it('should render the mobile version when user is on a mobile device', () => {
    mockUserAgent('iPhone')
    render(<BannerImage bannerImage={SUPER_METROID.bannerImage} />)
    expect(screen.getByTestId('banner-image')).toHaveStyle({
      backgroundImage: SUPER_METROID.bannerImage.mobile.url,
    })
  })

  it("should not render a background image when a url isn't present", () => {
    mockUserAgent('iPhone')
    render(<BannerImage bannerImage={{ mobile: { url: null }, url: null }} />)
    expect(screen.getByTestId('banner-image').style.backgroundImage).toBe('')
  })
})
