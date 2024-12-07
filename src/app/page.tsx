import React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function Home() {
  return (
    <>
      <SpeedInsights />
      <main className="container pt-40">
        <h1 className="font-serif text-h-xxl">Green Quest</h1>
      </main>
    </>
  )
}
