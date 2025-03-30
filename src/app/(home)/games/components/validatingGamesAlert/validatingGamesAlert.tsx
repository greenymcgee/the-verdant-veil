import React from 'react'

interface Props {
  isValidating: boolean
}

export function ValidatingGamesAlert({ isValidating }: Props) {
  if (!isValidating) return null

  return (
    <p aria-live="polite" className="sr-only" role="alert">
      Validating games
    </p>
  )
}
