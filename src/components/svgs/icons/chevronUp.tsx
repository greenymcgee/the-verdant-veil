import React, { HTMLAttributes } from 'react'

export const ChevronUp = (props: HTMLAttributes<HTMLOrSVGElement>) => (
  <svg fill="none" height="1em" viewBox="0 0 24 25" width="1em" {...props}>
    <path
      d="M7.41 16.019l4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6 1.41 1.41z"
      fill="#0B0A07"
    />
  </svg>
)
