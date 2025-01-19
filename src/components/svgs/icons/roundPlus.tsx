import React, { HTMLAttributes } from 'react'

export const RoundPlus = (props: HTMLAttributes<HTMLOrSVGElement>) => (
  <svg fill="none" height="1em" viewBox="0 0 24 25" width="1em" {...props}>
    <path
      d="M18 13.607h-5v5a1 1 0 01-2 0v-5H6a1 1 0 110-2h5v-5a1 1 0 012 0v5h5a1 1 0 010 2z"
      fill="currentColor"
    />
  </svg>
)
