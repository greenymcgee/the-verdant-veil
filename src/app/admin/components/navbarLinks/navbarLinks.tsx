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
            'flex gap-1 whitespace-nowrap rounded-lg p-2 hover:bg-primary-100',
            {
              'bg-primary-50': activeNavbarLink === 'adminGames',
            },
          )}
          href={ROUTES.adminGames}
          onClick={onLinkClick}
        >
          <Icon className="text-[1.5rem] text-primary-900" icon="videogame" />{' '}
          <span className="-mt-[1px] font-medium">Games</span>
        </Link>
      </li>
      <li>
        <Link
          className={clsx(
            TRANSITION_STYLES.inputHover,
            'flex gap-1 whitespace-nowrap rounded-lg p-2 hover:bg-primary-100',
            {
              'bg-primary-50': activeNavbarLink === 'adminUsers',
            },
          )}
          href={ROUTES.adminUsers}
          onClick={onLinkClick}
        >
          <Icon className="text-[1.5rem] text-primary-900" icon="user" />{' '}
          <span className="font-medium">Users</span>
        </Link>
      </li>
    </ul>
  )
}
