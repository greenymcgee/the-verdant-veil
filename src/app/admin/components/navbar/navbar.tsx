'use client'
import React, { useRef } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { Button, HamburgerMenu, Logo } from '@/components'
import { ROUTES, TRANSITION_STYLES } from '@/constants'
import { useDialogToggle } from '@/hooks'

import { LogoutForm } from '../logoutForm'
import { NavbarLinks } from '../navbarLinks'

export function Navbar() {
  const hamburgerMenuRef = useRef<HTMLDialogElement>(null)
  const { expanded, toggleDialog } = useDialogToggle(hamburgerMenuRef, {
    animationDuration: 100,
  })

  return (
    <nav
      className={clsx(
        'fixed z-10 w-full border-b-[1px] border-neutral-300 bg-white py-6',
        'md:flex md:h-screen md:w-auto md:flex-col md:justify-between md:border-b-0',
      )}
    >
      <div className="flex items-center justify-between px-4 md:flex-col">
        <Link
          aria-label="The Verdant Veil"
          className={clsx(
            TRANSITION_STYLES.inputHover,
            'block text-[4rem] text-neutral-900 transition-opacity hover:opacity-80 md:mb-8 md:text-[5.5rem]',
          )}
          href={ROUTES.home}
        >
          <Logo />
        </Link>
        <HamburgerMenu
          className="flex md:hidden"
          expanded={expanded}
          ref={hamburgerMenuRef}
          toggleDialog={toggleDialog}
        >
          <div className="flex min-h-[inherit] min-w-[156px] flex-col px-3 pt-6 pb-3">
            <div className="mb-6 flex flex-col gap-3 border-b-1 pb-6">
              <Button
                className="w-full text-center"
                classNameOverrides={{ display: 'block' }}
                onClick={toggleDialog}
                size="sm"
                theme="neutral"
              >
                Close
              </Button>
              <LogoutForm testId="mobile-logout-button" />
            </div>
            <NavbarLinks
              className="flex flex-col gap-3"
              onLinkClick={toggleDialog}
            />
          </div>
        </HamburgerMenu>
        <NavbarLinks
          className="hidden flex-col gap-3 md:flex"
          data-testid="desktop-navigation"
        />
      </div>
      <LogoutForm
        className="hidden px-4 md:block"
        testId="desktop-logout-button"
      />
    </nav>
  )
}
