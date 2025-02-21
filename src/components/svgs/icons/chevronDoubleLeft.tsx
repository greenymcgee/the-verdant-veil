import React, { HTMLAttributes } from 'react'

export const ChevronDoubleLeft = (props: HTMLAttributes<HTMLOrSVGElement>) => (
  <svg height="1em" viewBox="0 0 24 24" width="1em" {...props}>
    <path
      d="M18.41 7.41L17 6l-6 6 6 6 1.41-1.41L13.83 12zm-6 0L11 6l-6 6 6 6 1.41-1.41L7.83 12z"
      fill="currentColor"
    />
  </svg>
)
