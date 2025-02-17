'use client'
import React, { useRef } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { Button, HamburgerMenu, Logo } from '@/components'
import { ROUTES, TRANSITION_STYLES } from '@/constants'
import { toggleSidebarDialog } from '@/utils'

import { LogoutForm } from '../logoutForm'
import { NavbarLinks } from '../navbarLinks'

export function Navbar() {
  const hamburgerMenuRef = useRef<HTMLDialogElement>(null)
  const closeHamburgerMenu = () => toggleSidebarDialog(hamburgerMenuRef.current)

  return (
    <nav
      className={clsx(
        'fixed z-10 w-full border-b-[1px] border-neutral-300 bg-white py-6',
        'sm:static sm:flex sm:h-[100vh] sm:w-auto sm:flex-col sm:justify-between sm:border-b-0',
      )}
    >
      <div className="flex items-center justify-between px-4 sm:flex-col">
        <Link
          aria-label="Green Quest"
          className={clsx(
            TRANSITION_STYLES.inputHover,
            'block text-[4rem] transition-opacity hover:opacity-80 sm:mb-8 sm:text-[5.5rem]',
          )}
          href={ROUTES.home}
        >
          <Logo />
        </Link>
        <HamburgerMenu className="flex sm:hidden" ref={hamburgerMenuRef}>
          <div className="flex min-h-[inherit] min-w-[156px] flex-col px-3 pt-6 pb-3">
            <div className="mb-6 flex flex-col gap-3 border-b-1 pb-6">
              <Button
                className="block w-full text-center"
                onClick={closeHamburgerMenu}
                size="sm"
                theme="neutral"
              >
                Close
              </Button>
              <LogoutForm testId="mobile-logout-button" />
            </div>
            <NavbarLinks
              className="flex flex-col gap-3"
              onLinkClick={closeHamburgerMenu}
            />
          </div>
        </HamburgerMenu>
        <NavbarLinks
          className="hidden flex-col gap-3 sm:flex"
          data-testid="desktop-navigation"
        />
      </div>
      <LogoutForm
        className="hidden px-4 sm:block"
        testId="desktop-logout-button"
      />
    </nav>
  )
}
