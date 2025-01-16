import React, { ReactNode } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import clsx from 'clsx'
import type { Metadata } from 'next'
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
          'font-sans text-neutral-900',
        )}
      >
        <SpeedInsights />
        <Toaster />
        <div className="relative sm:flex">
          <Providers>
            <Navbar />
            <main className="container min-h-[100vh] bg-primary-50 pt-[113px] sm:pt-0">
              {children}
            </main>
          </Providers>
        </div>
      </body>
    </html>
  )
}
