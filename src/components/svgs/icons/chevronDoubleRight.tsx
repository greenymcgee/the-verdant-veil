import React, { HTMLAttributes } from 'react'

export const ChevronDoubleRight = (props: HTMLAttributes<HTMLOrSVGElement>) => (
  <svg height="1em" viewBox="0 0 24 24" width="1em" {...props}>
    <path
      d="M5.59 7.41L7 6l6 6-6 6-1.41-1.41L10.17 12zm6 0L13 6l6 6-6 6-1.41-1.41L16.17 12z"
      fill="currentColor"
    />
  </svg>
)
