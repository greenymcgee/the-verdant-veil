'use client'
import React, { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { Button, InputGroup, LinkTo, Spinner } from '@/components'
import { ROUTES } from '@/constants'

import { login } from '../actions'
import { useLoginRedirectUrl } from '../hooks'

export function LoginForm() {
  const [{ email, error, password, user }, action, loggingIn] = useActionState(
    login,
    {},
    ROUTES.login,
  )
  const { push } = useRouter()
  const redirectUrl = useLoginRedirectUrl()

  useEffect(() => {
    if (loggingIn || !error) return

    toast.error(error)
  }, [error, loggingIn, user])

  useEffect(() => {
    if (!user) return

    push(redirectUrl)
    setTimeout(() => toast.success(`Welcome back ${user.username}`))
  }, [push, redirectUrl, user])

  return (
    <form action={action} data-testid="login-form">
      {loggingIn || user ? (
        <Spinner className="mx-auto" />
      ) : (
        <>
          <InputGroup
            className="mb-6"
            id="email"
            inputProps={{
              autoComplete: 'email',
              defaultValue: email,
              name: 'email',
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
              defaultValue: password,
              name: 'password',
              type: 'password',
            }}
            label="Password"
            required
          />
          <LinkTo
            className="text-body-sm mb-6"
            classNameOverrides={{ display: 'block' }}
            href={ROUTES.forgotYourPassword}
          >
            Forgot your password?
          </LinkTo>
          <Button
            className="ml-auto"
            classNameOverrides={{ display: 'block' }}
            type="submit"
          >
            Login
          </Button>
        </>
      )}
    </form>
  )
}
