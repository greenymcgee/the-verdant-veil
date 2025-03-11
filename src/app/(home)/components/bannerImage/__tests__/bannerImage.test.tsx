import React from 'react'
import { act, screen } from '@testing-library/react'
import { mockUserAgent } from 'jest-useragent-mock'

import { SUPER_METROID } from '@/test/fixtures'
import { renderWithProviders } from '@/test/helpers'

import { BannerImage } from '..'

describe('<BannerImage />', () => {
  it('should render the desktop version when user is on a desktop device', async () => {
    mockUserAgent('Macintosh')
    renderWithProviders(<BannerImage bannerImage={SUPER_METROID.bannerImage} />)
    await act(async () => {
      expect(screen.getByTestId('banner-image')).toHaveStyle(
        `background-image: url("${SUPER_METROID.bannerImage.url}")`,
      )
    })
  })

  it('should render the mobile version when user is on a mobile device', async () => {
    renderWithProviders(<BannerImage bannerImage={SUPER_METROID.bannerImage} />)
    await act(async () => {
      expect(screen.getByTestId('banner-image')).toHaveStyle(
        `background-image: url("${SUPER_METROID.bannerImage.mobile.url}")`,
      )
    })
  })

  it("should not render a background image when a url isn't present", async () => {
    renderWithProviders(
      <BannerImage bannerImage={{ mobile: { url: null }, url: null }} />,
    )
    await act(async () => {
      expect(screen.getByTestId('banner-image').style.backgroundImage).toBe('')
    })
  })
})
