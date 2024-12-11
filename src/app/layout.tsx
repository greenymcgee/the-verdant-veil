import React from 'react'
import type { Metadata } from 'next'
import { Libre_Baskerville, Noto_Sans_JP } from 'next/font/google'

import './globals.css'
import { FocusManagement } from '@/components'

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
  description: 'A video game review site.',
  title: 'Green Quest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansJp.variable} ${libreBaskerville.variable}`}>
        <FocusManagement />
        {children}
      </body>
    </html>
  )
}
