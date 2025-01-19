import React, { ReactNode } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Libre_Baskerville, Noto_Sans_JP } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import '../globals.css'
import { LinkTo } from '@/components'
import { ROUTES } from '@/constants'

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
            <main className="min-h-[100vh] w-full bg-primary-50">
              <div className="container pt-32 sm:pt-8">
                <nav className="mb-4">
                  <ul className="flex">
                    <li>
                      <LinkTo href={ROUTES.adminGames} theme="secondary">
                        Games
                      </LinkTo>{' '}
                      /
                    </li>
                  </ul>
                </nav>
                <article className="shadow-card-dark border-1 rounded-lg border-neutral-100 bg-white p-3">
                  {children}
                </article>
              </div>
            </main>
          </Providers>
        </div>
      </body>
    </html>
  )
}
