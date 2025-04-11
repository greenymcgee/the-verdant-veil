import React, { HTMLAttributes } from 'react'

export const ChevronDown = (props: HTMLAttributes<HTMLOrSVGElement>) => (
  <svg fill="none" height="1em" viewBox="0 0 24 25" width="1em" {...props}>
    <path
      d="M7.41 9.189l4.59 4.59 4.59-4.59 1.41 1.42-6 6-6-6 1.41-1.42z"
      fill="currentColor"
    />
  </svg>
)
