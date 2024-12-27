import React from 'react'

import { Logo } from '@/components'

import { Navbar } from './components/navbar'

export default function HomePage() {
  return (
    <>
      <Navbar activeLinkTitle="Home" />
      <main>
        <div className="container pt-44">
          <header className="bg-neutral-900 text-center text-white lg:bg-transparent">
            <Logo className="mb-6 inline-block text-[16rem] sm:text-[20rem] md:text-[24rem]" />
            <h1 className="md:text-heading-xxl sm:text-heading-xl text-heading-lg font-serif">
              Green Quest
            </h1>
          </header>
        </div>
      </main>
    </>
  )
}
