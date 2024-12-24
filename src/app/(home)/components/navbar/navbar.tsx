'use client'
import React, { useCallback } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { Logo } from '@/components'
import { ROUTES, TRANSITION_STYLES } from '@/constants'

import { HamburgerMenu } from '../hamburgerMenu'

interface NavbarProps {
  activeLinkTitle: 'Home' | 'About'
}

const BASE_LINK_CLASSNAME = clsx(
  TRANSITION_STYLES.inputHover,
  'relative font-bold transition-colors hover:text-secondary-400',
  'after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-0',
  'after:rounded after:bg-secondary-400 after:transition-[width] after:content-[""] hover:after:w-[75%]',
)

export function Navbar({ activeLinkTitle }: NavbarProps) {
  const getLinkClassName = useCallback(
    (linkTitle: 'Home' | 'About') => {
      return clsx(BASE_LINK_CLASSNAME, {
        'after:w-[75%] text-secondary-400': activeLinkTitle === linkTitle,
      })
    },
    [activeLinkTitle],
  )

  return (
    <nav className="fixed w-full py-6" data-testid="main-nav">
      <div className="container flex items-center justify-between">
        <Link
          aria-label="Home"
          className={clsx(
            TRANSITION_STYLES.inputHover,
            'text-[4rem] transition-opacity hover:opacity-80',
          )}
          href={ROUTES.home}
        >
          <Logo />
        </Link>
        <HamburgerMenu activeLinkTitle={activeLinkTitle} />
        <ul className="hidden gap-6 sm:flex">
          <li>
            <Link
              className={getLinkClassName('Home')}
              data-testid="desktop-home-link"
              href={ROUTES.home}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={getLinkClassName('About')}
              data-testid="desktop-about-link"
              href={ROUTES.about}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={BASE_LINK_CLASSNAME}
              data-testid="desktop-login-link"
              href={ROUTES.login}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
