'use client'
import React, { HTMLAttributes, useMemo } from 'react'
import clsx from 'clsx'

import { Icon } from '@/components'
import { BREAKPOINTS } from '@/constants'
import { useWindowSize } from '@/hooks'

interface Props extends HTMLAttributes<HTMLDivElement> {
  bannerImage: { mobile: { url: string | null }; url: string | null }
}

export function BannerImage({ bannerImage, className, ...options }: Props) {
  const { width } = useWindowSize()
  const url = useMemo(() => {
    if (!width) return ''

    return width >= BREAKPOINTS.md ? bannerImage.url : bannerImage.mobile.url
  }, [bannerImage.mobile.url, bannerImage.url, width])

  return (
    <div className={className}>
      <div
        className={clsx('aspect-3/1 bg-neutral-50 bg-contain bg-no-repeat', {
          'text-primary-700 flex animate-pulse items-center justify-center':
            !url,
        })}
        data-testid="banner-image"
        style={{
          backgroundImage: url ? `url("${url}")` : undefined,
        }}
        {...options}
      >
        {url ? null : (
          <Icon
            className="text-7xl"
            data-testid="banner-image-icon"
            icon="image"
          />
        )}
      </div>
    </div>
  )
}
