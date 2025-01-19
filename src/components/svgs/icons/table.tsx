import React, { HTMLAttributes } from 'react'

export const TableIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => (
  <svg fill="none" height="1em" viewBox="0 0 24 25" width="1em" {...props}>
    <path
      d="M5 4.609h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2v-12a2 2 0 012-2zm0 4v4h6v-4H5zm8 0v4h6v-4h-6zm-8 6v4h6v-4H5zm8 0v4h6v-4h-6z"
      fill="currentColor"
    />
  </svg>
)
