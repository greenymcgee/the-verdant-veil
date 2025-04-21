import React from 'react'
import clsx from 'clsx'

import { Heading, Logo } from '@/components'

import { PageWithNavbar, PS1Carousel, SNESCarousel } from './components'

export default function HomePage() {
  return (
    <PageWithNavbar activeLinkTitle="Home">
      <div className="container">
        <header
          className={clsx(
            'min-h-[calc(100vh-11rem)] bg-neutral-900 text-center text-white',
            'lg:bg-transparent',
          )}
        >
          <div>
            <Logo
              className={clsx(
                'mb-6 inline-block text-[16rem]',
                'sm:text-[20rem] md:text-[24rem] 2xl:text-[32rem]',
              )}
            />
            <Heading
              className="mb-2 bg-neutral-900 font-serif"
              classNameOverrides={{
                color: 'text-white',
                fontSize:
                  'md:text-heading-xxl sm:text-heading-xl text-heading-lg',
              }}
            >
              The Verdant Veil
            </Heading>
            <p className="sm:tracking-ultra-wide bg-neutral-900 tracking-widest uppercase">
              A journey through time
            </p>
          </div>
        </header>
        <SNESCarousel />
        <PS1Carousel />
      </div>
    </PageWithNavbar>
  )
}
