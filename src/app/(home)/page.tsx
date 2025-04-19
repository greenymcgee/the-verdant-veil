import React, { Suspense } from 'react'

import { Heading, Logo, Spinner } from '@/components'

import { PageWithNavbar, SNESCarousel } from './components'

export default function HomePage() {
  return (
    <PageWithNavbar activeLinkTitle="Home">
      <div className="container">
        <header className="mb-40 bg-neutral-900 text-center text-white lg:bg-transparent">
          <Logo className="mb-6 inline-block text-[16rem] sm:text-[20rem] md:text-[24rem]" />
          <Heading
            className="font-serif"
            classNameOverrides={{
              color: 'text-white',
              fontSize:
                'md:text-heading-xxl sm:text-heading-xl text-heading-lg',
            }}
          >
            Green Quest
          </Heading>
        </header>
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Spinner />
            </div>
          }
        >
          <SNESCarousel />
        </Suspense>
      </div>
    </PageWithNavbar>
  )
}
