'use client'
import React, { HTMLAttributes } from 'react'

import { usePageContext } from '@/context'

interface Props extends HTMLAttributes<HTMLDivElement> {
  bannerImage: { mobile: { url: string | null }; url: string | null }
}

export function BannerImage({ bannerImage, className, ...options }: Props) {
  const { userAgent } = usePageContext()
  const url =
    userAgent.platform.type === 'desktop'
      ? bannerImage.url
      : bannerImage.mobile.url

  return (
    <div className={className}>
      <div
        className="aspect-3/1 bg-contain bg-no-repeat"
        data-testid="banner-image"
        style={{
          backgroundImage: url ? `url("${url}")` : undefined,
        }}
        {...options}
      />
    </div>
  )
}
