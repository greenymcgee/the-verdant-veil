import React, { HTMLAttributes } from 'react'

export const ExclamationThick = (props: HTMLAttributes<HTMLOrSVGElement>) => (
  <svg height="1em" viewBox="0 0 24 24" width="1em" {...props}>
    <path d="M10 3h4v11h-4zm0 18v-4h4v4z" fill="currentColor" />
  </svg>
)
