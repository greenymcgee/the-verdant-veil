import React from 'react'
import { render, screen } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'

import { PageWithNavbar } from '..'

describe('<PageWithNavbar />', () => {
  describe('bannerImage', () => {
    it('should render a banner image when present', async () => {
      render(
        <PageWithNavbar
          activeLinkTitle="About"
          bannerImage={SUPER_METROID.bannerImage}
        />,
      )
      expect(await screen.findByTestId('banner-image')).toBeVisible()
    })

    it('should not render a banner image when blank', () => {
      render(<PageWithNavbar activeLinkTitle="About" />)
      expect(screen.queryByTestId('banner-image')).not.toBeInTheDocument()
    })
  })
})
