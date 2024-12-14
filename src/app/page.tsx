import React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Logo } from '@/components'

export default function Home() {
  return (
    <>
      <SpeedInsights />
      <main className="container pt-44 bg-neutral-900">
        <header className="text-center mb-40 text-white">
          <Logo className="text-[24rem] inline-block mb-6" />
          <h1 className="font-serif text-h-xxl">Green Quest</h1>
        </header>
      </main>
    </>
  )
}
