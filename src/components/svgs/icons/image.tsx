import React, { HTMLAttributes } from 'react'

export const ImageIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => (
  <svg fill="none" height="1em" viewBox="0 0 24 25" width="1em" {...props}>
    <path
      d="M8.5 14.109l2.5 3 3.5-4.5 4.5 6H5m16 1v-14a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z"
      fill="currentColor"
    />
  </svg>
)
