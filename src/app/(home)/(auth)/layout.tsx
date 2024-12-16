import React, { PropsWithChildren } from 'react'

import { LinkTo, Logo } from '@/components'
import { ROUTES } from '@/constants'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <div className="container flex h-screen flex-col justify-center">
        <div className="mx-auto w-full max-w-xl rounded-md bg-white p-4 text-neutral-900">
          <header className="text-center">
            <LinkTo aria-label="Home" href={ROUTES.home} theme="neutral">
              <Logo className="mb-4 inline-block text-[10rem]" />
            </LinkTo>
            <h1 className="mb-8 font-serif text-h-xl">Green Quest</h1>
          </header>
          {children}
        </div>
      </div>
    </main>
  )
}
