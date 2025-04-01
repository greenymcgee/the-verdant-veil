'use client'
import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { Logo, Searchbar } from '@/components'
import { ROUTES, TRANSITION_STYLES } from '@/constants'
import { useCurrentUser } from '@/context'
import { useScrollPosition } from '@/hooks'

import { HamburgerMenu } from '../hamburgerMenu'
import { MainNavLink } from '../mainNavLink'

interface NavbarProps {
  activeLinkTitle: PropsOf<typeof MainNavLink>['activeLinkTitle']
}

export function Navbar({ activeLinkTitle }: NavbarProps) {
  const { y } = useScrollPosition()
  const { user } = useCurrentUser()

  return (
    <nav
      className={clsx(
        'transition-main-nav fixed z-10 w-full py-6 duration-300 ease-linear',
        {
          'shadow-nav-light bg-white text-neutral-900': y,
          'text-white': !y,
        },
      )}
      data-testid="main-nav"
    >
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
        <div className="flex items-center justify-end gap-6">
          <Searchbar
            className="max-w-1/2"
            labelProps={{ ariaLabel: 'Search for games by name' }}
            pathnameOverride={ROUTES.games}
          />
          <HamburgerMenu activeLinkTitle={activeLinkTitle} />
          <ul className="hidden gap-6 sm:flex">
            {user.admin ? (
              <li>
                <MainNavLink
                  activeLinkTitle={activeLinkTitle}
                  data-testid="desktop-admin-link"
                  href={ROUTES.adminGames}
                  title="Admin"
                  type="desktop"
                />
              </li>
            ) : null}
            <li>
              <MainNavLink
                activeLinkTitle={activeLinkTitle}
                data-testid="desktop-home-link"
                href={ROUTES.home}
                title="Home"
                type="desktop"
              />
            </li>
            <li>
              <MainNavLink
                activeLinkTitle={activeLinkTitle}
                data-testid="desktop-about-link"
                href={ROUTES.about}
                title="About"
                type="desktop"
              />
            </li>
            <li>
              <MainNavLink
                activeLinkTitle={activeLinkTitle}
                data-testid="desktop-games-link"
                href={ROUTES.games}
                title="Games"
                type="desktop"
              />
            </li>
            <li>
              <MainNavLink
                activeLinkTitle={activeLinkTitle}
                data-testid="desktop-login-link"
                href={ROUTES.login}
                title="Login"
                type="desktop"
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
