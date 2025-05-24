import React from 'react'
import type { Metadata } from 'next'

import { ResetPasswordForm } from './components'

export const metadata: Metadata = { title: 'Reset Password' }

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
