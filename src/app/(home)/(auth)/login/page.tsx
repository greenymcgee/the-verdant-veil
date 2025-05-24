import React, { Suspense } from 'react'
import type { Metadata } from 'next'

import { Spinner } from '@/components'

import { LoginForm } from './components'

export const metadata: Metadata = { title: 'Login' }

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <Spinner />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
