import React, { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

import '../globals.css'

import { Navbar } from './components'

export const metadata: Metadata = {
  description: "The Verdant Veil's admin.",
  title: 'The Verdant Veil Admin',
}

export default function AdminLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="relative bg-white sm:flex">
      <Navbar />
      {/* The 129px will need to change if navbar width ever changes. */}
      {/* For now the hard coded width avoids lots of unnecessary JS to measure navbar width */}
      <main
        className="bg-primary-50 min-h-screen w-full md:ml-[129px]"
        data-testid="admin-main"
      >
        <div className="container pt-32 pb-8 md:pt-8">{children}</div>
      </main>
    </div>
  )
}
