import React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Logo } from '@/components'

export default function Home() {
  return (
    <main className="stars-layout">
      <SpeedInsights />
      <div className="container pt-44">
        <header className="bg-neutral-900 text-center text-white">
          <Logo className="mb-6 inline-block text-[24rem]" />
          <h1 className="font-serif text-h-xxl">Green Quest</h1>
        </header>
      </div>
    </main>
  )
}
