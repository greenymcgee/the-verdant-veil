import React, { Suspense } from 'react'

import { Spinner } from '@/components'

import { LoginForm } from './components'

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
