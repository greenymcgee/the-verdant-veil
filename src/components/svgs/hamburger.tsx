/* eslint-disable react/jsx-sort-props */
import React, { HTMLAttributes } from 'react'

export function Hamburger(props: HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="none"
      height="1em"
      viewBox="0 0 40 29"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="currentColor" clipPath="url(#Hamburger_svg__a)">
        <rect height={4} rx={2} width={40} y={0.081} />
        <rect width={40} height={4} y={12.081} rx={2} />
        <rect width={40} height={4} y={24.081} rx={2} />
      </g>
      <defs>
        <clipPath id="Hamburger_svg__a">
          <path fill="#fff" d="M0 .08h40v28H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

/* eslint-enable react/jsx-sort-props */
