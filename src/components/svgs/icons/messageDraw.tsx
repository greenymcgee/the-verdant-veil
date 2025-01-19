import React, { HTMLAttributes } from 'react'

export const MessageDraw = (props: HTMLAttributes<HTMLOrSVGElement>) => (
  <svg fill="none" height="1em" viewBox="0 0 24 25" width="1em" {...props}>
    <path
      d="M18 14.609h-7.5l2-2H18m-12 2v-2.5l6.88-6.86c.19-.19.51-.19.71 0l1.76 1.77c.2.2.2.51 0 .71l-6.88 6.88m11.53-12H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2v-12a2 2 0 00-2-2z"
      fill="currentColor"
    />
  </svg>
)
