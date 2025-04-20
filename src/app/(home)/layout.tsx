import React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import clsx from 'clsx'
import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Inter, Libre_Baskerville } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import '../globals.css'
import { Providers } from '@/context'

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-libre-baskerville',
  weight: '700',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  description: 'A video game review site.',
  title: 'The Verdant Veil',
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.variable,
          libreBaskerville.variable,
          'bg-stars bg-top-center leading-body relative',
          'bg-neutral-900 font-sans text-neutral-700',
        )}
      >
        <SpeedInsights />
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
