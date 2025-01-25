import React, { HTMLAttributes } from 'react'

export const ChevronLeft = (props: HTMLAttributes<HTMLOrSVGElement>) => (
  <svg height="1em" viewBox="0 0 24 24" width="1em" {...props}>
    <path
      d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6z"
      fill="currentColor"
    />
  </svg>
)
