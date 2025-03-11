import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'

import { BannerImage } from '../bannerImage'
import { Navbar } from '../navbar'

type Extensions = Pick<PropsOf<typeof Navbar>, 'activeLinkTitle'> &
  PropsWithChildren
interface Props extends Extensions {
  bannerImage?: PropsOf<typeof BannerImage>['bannerImage']
}

export function PageWithNavbar({
  activeLinkTitle,
  bannerImage,
  children,
}: Props) {
  return (
    <>
      <Navbar activeLinkTitle={activeLinkTitle} />
      {bannerImage ? (
        <BannerImage bannerImage={bannerImage} className="pt-28" />
      ) : null}
      <main
        className={clsx({ 'pt-14 pb-44': bannerImage, 'py-44': !bannerImage })}
      >
        {children}
      </main>
    </>
  )
}
