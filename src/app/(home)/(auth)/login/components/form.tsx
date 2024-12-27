'use client'
import React, { FormEvent, useCallback } from 'react'

import { Button, InputGroup, LinkTo, Spinner } from '@/components'
import { ROUTES } from '@/constants'

import { usePostLogin } from '../hooks'

export function LoginForm() {
  const { trigger, isMutating } = usePostLogin()

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      await trigger(formData).catch((error) => error)
    },
    [trigger],
  )

  return (
    <form data-testid="login-form" onSubmit={handleSubmit}>
      {isMutating ? (
        <Spinner className="mx-auto" />
      ) : (
        <>
          <InputGroup
            className="mb-6"
            id="email"
            inputProps={{
              autoComplete: 'email',
              name: 'user[email]',
              type: 'email',
            }}
            label="Email"
            required
          />
          <InputGroup
            className="mb-2"
            id="password"
            inputProps={{
              autoComplete: 'current-password',
              name: 'user[password]',
              type: 'password',
            }}
            label="Password"
            required
          />
          <LinkTo
            className="mb-6 block text-body-sm"
            href={ROUTES.forgotYourPassword}
          >
            Forgot your password?
          </LinkTo>
          <Button className="ml-auto block" type="submit">
            Login
          </Button>
        </>
      )}
    </form>
  )
}
