'use client'
import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { Icon } from '@/components'
import { ROUTES, TRANSITION_STYLES } from '@/constants'
import { usePageContext } from '@/context'

interface NavbarLinksProps extends HTMLAttributes<HTMLUListElement> {
  onLinkClick?: VoidFunction
}

export function NavbarLinks({ onLinkClick, ...options }: NavbarLinksProps) {
  const { activeNavbarLink } = usePageContext()
  return (
    <ul {...options}>
      <li>
        <Link
          className={clsx(
            TRANSITION_STYLES.inputHover,
            'hover:bg-primary-100 flex gap-1 rounded-lg p-2 whitespace-nowrap text-neutral-900',
            {
              'bg-primary-50': activeNavbarLink === 'adminGames',
              skeleton: !activeNavbarLink,
            },
          )}
          href={ROUTES.adminGames}
          onClick={onLinkClick}
        >
          <Icon className="text-primary-900 text-[1.5rem]" icon="videogame" />{' '}
          <span className="-mt-[1px] font-semibold">Games</span>
        </Link>
      </li>
    </ul>
  )
}
