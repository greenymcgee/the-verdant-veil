import React, { HTMLAttributes } from 'react'

/**
 * mid:user
 */
export function User(props: HTMLAttributes<HTMLOrSVGElement>) {
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
        d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
        fill="currentColor"
      />
    </svg>
  )
}
