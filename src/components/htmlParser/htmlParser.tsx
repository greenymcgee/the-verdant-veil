import React, { HTMLAttributes } from 'react'
import DOMPurify from 'isomorphic-dompurify'

interface Props extends HTMLAttributes<HTMLDivElement> {
  html: string
}

export function HTMLParser({ html, ...options }: Props) {
  return (
    <div
      className="rich-text"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html),
      }}
      {...options}
    />
  )
}
