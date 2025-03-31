import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'

import { BannerImage } from '../bannerImage'
import { Navbar } from '../navbar'

type Extensions = Pick<PropsOf<typeof Navbar>, 'activeLinkTitle'> &
  PropsWithChildren
interface Props extends Extensions {
  bannerImage?: PropsOf<typeof BannerImage>['bannerImage']
  classNameOverrides?: { padding?: string }
}

export function PageWithNavbar({
  activeLinkTitle,
  bannerImage,
  children,
  classNameOverrides,
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
            'pt-14 pb-44': bannerImage && !classNameOverrides?.padding,
            'py-44': !bannerImage && !classNameOverrides?.padding,
          },
          classNameOverrides?.padding,
        )}
      >
        {children}
      </main>
    </>
  )
}
