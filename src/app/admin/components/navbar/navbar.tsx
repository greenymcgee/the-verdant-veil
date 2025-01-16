'use client'
import React, { useRef } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { Button, HamburgerMenu, Logo } from '@/components'
import { ROUTES, TRANSITION_STYLES } from '@/constants'
import { toggleDialogOpen } from '@/utils'

import { NavbarLinks } from '../navbarLinks'

export function Navbar() {
  const hamburgerMenuRef = useRef<HTMLDialogElement>(null)
  const closeHamburgerMenu = () => toggleDialogOpen(hamburgerMenuRef.current)

  return (
    <nav
      className={clsx(
        'fixed w-full border-b-[1px] border-neutral-300 bg-white py-6',
        'sm:static sm:h-[100vh] sm:w-auto sm:border-b-0',
      )}
    >
      <div className="container flex items-center justify-between sm:flex-col">
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
          <div className="flex min-h-[inherit] min-w-[220px] flex-col justify-between px-3 pb-3 pt-6">
            <NavbarLinks
              className="flex flex-col gap-3"
              onLinkClick={closeHamburgerMenu}
            />
            <Button onClick={closeHamburgerMenu} theme="neutral">
              Close
            </Button>
          </div>
        </HamburgerMenu>
        <NavbarLinks
          className="hidden flex-col gap-3 sm:flex"
          data-testid="desktop-navigation"
        />
      </div>
    </nav>
  )
}
