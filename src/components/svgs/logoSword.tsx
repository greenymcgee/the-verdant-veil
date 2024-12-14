import React, { HTMLAttributes } from 'react'

export function LogoSword(props: HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      fill="none"
      height="1em"
      viewBox="0 0 24 40"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.055 4.334a2.168 2.168 0 1 0 .002-4.336 2.168 2.168 0 0 0-.002 4.336m0 0h-.753v8.512H3.767L2.233 11.31 0 13.543l2.233 2.233 1.534-1.535h16.466l1.534 1.535L24 13.543l-2.233-2.232-1.534 1.535h-7.396V4.334zm-.296 10.326h.482zm0 0L12 39.065l.241-24.405h2.829l-.133 4.434-.591 2.332.56-1.287-.394 13.13L12 39.218l-2.372-5.95-.282-7.52.602 1.536-.66-3.064-.358-9.56z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}
