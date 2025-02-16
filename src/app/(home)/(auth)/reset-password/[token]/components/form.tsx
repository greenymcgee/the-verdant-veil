'use client'
import React, { FormEvent, useCallback } from 'react'
import { useParams } from 'next/navigation'

import { Button, InputGroup, Spinner } from '@/components'

import { usePatchResetPassword } from '../hooks'

export function ResetPasswordForm() {
  const { token } = useParams()
  const { isMutating, trigger } = usePatchResetPassword()

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      await trigger(formData).catch((error) => error)
    },
    [trigger],
  )

  if (isMutating) return <Spinner className="mx-auto" />

  return (
    <form data-testid="reset-password-form" onSubmit={handleSubmit}>
      <input name="token" type="hidden" value={token} />
      <InputGroup
        className="mb-6"
        id="password"
        inputProps={{ name: 'password', type: 'password' }}
        label="Password"
        required
      />
      <InputGroup
        className="mb-2"
        id="password-confirmation"
        inputProps={{ name: 'password_confirmation', type: 'password' }}
        label="Confirmation"
        required
      />
      <Button className="ml-auto block" type="submit">
        Reset password
      </Button>
    </form>
  )
}
