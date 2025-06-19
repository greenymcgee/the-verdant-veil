'use client'
import React, { useRef } from 'react'

import { HamburgerMenu, Icon } from '@/components'
import { ROUTES } from '@/constants'
import { useDialogToggle } from '@/hooks'
import { useCurrentUser } from '@/hooks/api'

import { MainNavLink } from '../mainNavLink'

interface HamburgerMenuProps {
  activeLinkTitle: PropsOf<typeof MainNavLink>['activeLinkTitle']
}

export function HomeNavbarHamburgerMenu({
  activeLinkTitle,
}: HamburgerMenuProps) {
  const hamburgerMenuRef = useRef<HTMLDialogElement>(null)
  const { expanded, toggleDialog } = useDialogToggle(hamburgerMenuRef, {
    animationDuration: 100,
  })
  const { user } = useCurrentUser()

  return (
    <HamburgerMenu
      className="sm:hidden"
      expanded={expanded}
      ref={hamburgerMenuRef}
      toggleDialog={toggleDialog}
    >
      <div className="min-h-[inherit] pt-4">
        <button
          aria-label="Close Hamburger Menu"
          className="mr-4 mb-2 ml-auto block text-2xl font-medium"
          onClick={toggleDialog}
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
                  onClick={toggleDialog}
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
                onClick={toggleDialog}
                title="Home"
                type="mobile"
              />
            </li>
            <li>
              <MainNavLink
                activeLinkTitle={activeLinkTitle}
                href={ROUTES.about}
                onClick={toggleDialog}
                title="About"
                type="mobile"
              />
            </li>
            <li>
              <MainNavLink
                activeLinkTitle={activeLinkTitle}
                href={ROUTES.games}
                onClick={toggleDialog}
                title="Games"
                type="mobile"
              />
            </li>
          </ul>
        </nav>
      </div>
    </HamburgerMenu>
  )
}
