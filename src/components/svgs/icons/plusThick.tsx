import React, { HTMLAttributes } from 'react'

export const PlusThick = (props: HTMLAttributes<HTMLOrSVGElement>) => (
  <svg
    height="1em"
    viewBox="0 0 24 24"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M20 14h-6v6h-4v-6H4v-4h6V4h4v6h6z" fill="currentColor" />
  </svg>
)
