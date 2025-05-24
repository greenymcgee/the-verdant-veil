import React from 'react'
import type { Metadata } from 'next'

import { ForgotPasswordForm } from './components'

export const metadata: Metadata = { title: 'Forgot Password' }

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
