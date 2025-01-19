import React, { HTMLAttributes } from 'react'

/**
 * mid:baseline-videogame-asset
 */
export function VideogameIcon(props: HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className="iconify iconify--ic"
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-10 7H8v3H6v-3H3v-2h3V8h2v3h3zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5"
        fill="currentColor"
      />
    </svg>
  )
}
