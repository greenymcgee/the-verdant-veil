import React, { HTMLAttributes } from 'react'

/**
 * mdi:magnify
 */
export function Magnify(props: HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className="iconify iconify--mdi"
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M9.5 3A6.5 6.5 0 0116 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.52 6.52 0 019.5 16 6.5 6.5 0 013 9.5 6.5 6.5 0 019.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5"
        fill="currentColor"
      />
    </svg>
  )
}
