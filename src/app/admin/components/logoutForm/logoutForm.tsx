'use client'
import React, { useActionState, useEffect } from 'react'
import toast from 'react-hot-toast'

import { logout } from '@/actions'
import { Button } from '@/components'

interface Props {
  className?: string
  testId: string
}

export function LogoutForm({ className, testId }: Props) {
  const [{ message } = {}, action, isLoggingOut] = useActionState(logout, {})

  useEffect(() => {
    if (!message) return

    toast.error(message)
  }, [message])

  return (
    <form action={action} className={className}>
      <Button
        className="w-full"
        classNameOverrides={{ display: 'flex justify-center' }}
        data-testid={testId}
        loading={isLoggingOut}
        size="sm"
        text="Logout"
        theme="secondary"
        type="submit"
      />
    </form>
  )
}
