import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'

import { LinkTo } from '@/components'

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
    <div className="bg-stars bg-top-center flex min-h-full flex-col bg-neutral-900">
      <Navbar activeLinkTitle={activeLinkTitle} />
      {bannerImage ? (
        <BannerImage bannerImage={bannerImage} className="pt-28" />
      ) : null}
      <main
        className={clsx(
          'grow',
          {
            'pt-14 pb-24': bannerImage && !classNameOverrides?.padding,
            'pt-44 pb-24': !bannerImage && !classNameOverrides?.padding,
          },
          classNameOverrides?.padding,
        )}
      >
        {children}
      </main>
      <footer className="bg-primary-50 py-8 text-center text-sm">
        <p className="container mb-2">
          &copy; 2025 Houston Green. Built with Rails & Next.js. View on{' '}
          <LinkTo
            href="https://github.com/greenymcgee/the-verdant-veil"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </LinkTo>
          .
        </p>
      </footer>
    </div>
  )
}
