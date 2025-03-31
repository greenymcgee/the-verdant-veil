// Safe to ignore since the close button is interactive and tabbable. Making the
// margin interactive would confuse the keyboard user.
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'
import React, { SyntheticEvent, useCallback, useRef, useState } from 'react'
import clsx from 'clsx'

import { Hamburger, Icon } from '@/components'
import { ROUTES } from '@/constants'
import { useCurrentUser } from '@/context'

import { MainNavLink } from '../mainNavLink'
import { toggleSidebarDialog } from './utils'

interface HamburgerMenuProps {
  activeLinkTitle: PropsOf<typeof MainNavLink>['activeLinkTitle']
}

export function HamburgerMenu({ activeLinkTitle }: HamburgerMenuProps) {
  const hamburgerMenuRef = useRef<HTMLDialogElement>(null)
  const [expanded, setExpanded] = useState(false)
  const { user } = useCurrentUser()

  const toggleHamburgerMenu = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded)
    toggleSidebarDialog(hamburgerMenuRef.current)
  }, [])

  const handleOutsideContentClick = useCallback(
    (event: SyntheticEvent<HTMLDialogElement>) => {
      if (event.target !== hamburgerMenuRef.current) return

      toggleHamburgerMenu()
    },
    [toggleHamburgerMenu],
  )

  return (
    <>
      <button
        aria-controls="hamburger-menu"
        aria-expanded={expanded}
        aria-label="Open Hamburger Menu"
        className="sm:hidden"
        onClick={toggleHamburgerMenu}
        type="button"
      >
        <Hamburger className="text-[2.5rem]" />
      </button>
      <dialog
        className={clsx(
          'fixed m-0 ml-auto min-h-[100vh] translate-x-full transform',
          'transition-transform duration-100 ease-linear',
          'backdrop:bg-neutral-900 backdrop:opacity-60',
        )}
        data-testid="hamburger-menu"
        id="hamburger-menu"
        onClick={handleOutsideContentClick}
        ref={hamburgerMenuRef}
      >
        <div className="min-h-[inherit] pt-4">
          <button
            aria-label="Close Hamburger Menu"
            className="mr-4 mb-2 ml-auto block text-2xl font-medium"
            onClick={toggleHamburgerMenu}
            type="button"
          >
            <Icon icon="close" />
          </button>
          <nav>
            <ul className="flex flex-col gap-4 pr-20 pl-4 font-bold">
              {user.admin ? (
                <li>
                  <MainNavLink
                    activeLinkTitle={activeLinkTitle}
                    data-testid="mobile-admin-link"
                    href={ROUTES.adminGames}
                    onClick={toggleHamburgerMenu}
                    title="Admin"
                    type="mobile"
                  />
                </li>
              ) : null}
              <li>
                <MainNavLink
                  activeLinkTitle={activeLinkTitle}
                  data-testid="mobile-home-link"
                  href={ROUTES.home}
                  onClick={toggleHamburgerMenu}
                  title="Home"
                  type="mobile"
                />
              </li>
              <li>
                <MainNavLink
                  activeLinkTitle={activeLinkTitle}
                  href={ROUTES.about}
                  onClick={toggleHamburgerMenu}
                  title="About"
                  type="mobile"
                />
              </li>
              <li>
                <MainNavLink
                  activeLinkTitle={activeLinkTitle}
                  href={ROUTES.games}
                  onClick={toggleHamburgerMenu}
                  title="Games"
                  type="mobile"
                />
              </li>
              <li>
                <MainNavLink
                  activeLinkTitle={activeLinkTitle}
                  href={ROUTES.login}
                  onClick={toggleHamburgerMenu}
                  title="Login"
                  type="mobile"
                />
              </li>
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  )
}

/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-enable jsx-a11y/click-events-have-key-events */
