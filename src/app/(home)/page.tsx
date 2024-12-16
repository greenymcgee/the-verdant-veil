import React from 'react'

import { Logo } from '@/components'

export default function HomePage() {
  return (
    <main>
      <div className="container pt-44">
        <header className="bg-neutral-900 text-center text-white lg:bg-transparent">
          <Logo className="mb-6 inline-block text-[16rem] sm:text-[20rem] md:text-[24rem]" />
          <h1 className="font-serif text-h-l sm:text-h-xl md:text-h-xxl">
            Green Quest
          </h1>
        </header>
      </div>
    </main>
  )
}
