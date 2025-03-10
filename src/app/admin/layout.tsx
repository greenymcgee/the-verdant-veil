import React, { ReactNode } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import clsx from 'clsx'
import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Libre_Baskerville, Noto_Sans_JP } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import '../globals.css'

import { Providers } from '../../context'
import { Navbar } from './components'

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-libre-baskerville',
  weight: '700',
})

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
})

export const metadata: Metadata = {
  description: 'The Green Quest admin.',
  title: 'Green Quest Admin',
}

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          notoSansJp.variable,
          libreBaskerville.variable,
          'leading-body bg-white font-sans text-neutral-700',
        )}
      >
        <SpeedInsights />
        <Toaster />
        <div className="relative sm:flex">
          <Providers>
            <Navbar />
            {/* The 129px will need to change if navbar width ever changes. */}
            {/* For now the hard coded width avoids lots of unnecessary JS to measure navbar width */}
            <main
              className="bg-primary-50 min-h-[100vh] w-full md:ml-[129px]"
              data-testid="admin-main"
            >
              <div className="container pt-32 pb-8 md:pt-8">{children}</div>
            </main>
          </Providers>
        </div>
      </body>
    </html>
  )
}
