import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'

import { BannerImage } from '../bannerImage'
import { Navbar } from '../navbar'

type Extensions = Pick<PropsOf<typeof Navbar>, 'activeLinkTitle'> &
  PropsWithChildren
interface Props extends Extensions {
  bannerImage?: PropsOf<typeof BannerImage>['bannerImage']
  paddingTop?: string
}

export function PageWithNavbar({
  activeLinkTitle,
  bannerImage,
  children,
  paddingTop,
}: Props) {
  return (
    <>
      <Navbar activeLinkTitle={activeLinkTitle} />
      {bannerImage ? (
        <BannerImage bannerImage={bannerImage} className="pt-28" />
      ) : null}
      <main
        className={clsx(
          {
            'pb-44': bannerImage || paddingTop,
            'pt-14': !paddingTop,
            'py-44': !bannerImage && !paddingTop,
          },
          paddingTop,
        )}
      >
        {children}
      </main>
    </>
  )
}
