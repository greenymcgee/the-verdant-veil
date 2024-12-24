// Safe to ignore since the close button is interactive and tabbable. Making the
// margin interactive would confuse the keyboard user.
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'
import React, { SyntheticEvent, useCallback, useRef, useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { Hamburger } from '@/components'
import { ROUTES, TRANSITION_STYLES } from '@/constants'

import { toggleDialogOpen } from './utils'

interface HamburgerMenuProps {
  activeLinkTitle: 'Home' | 'About'
}

// TODO: clean this up before merge
const BASE_LINK_CLASSNAME = clsx(
  TRANSITION_STYLES.inputHover,
  'relative font-bold transition-colors hover:text-secondary-900',
  'after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-0',
  'after:rounded after:bg-secondary-900 after:transition-[width] after:content-[""] hover:after:w-[75%]',
)

export function HamburgerMenu({ activeLinkTitle }: HamburgerMenuProps) {
  const hamburgerMenuRef = useRef<HTMLDialogElement>(null)
  const [expanded, setExpanded] = useState(false)
  const getLinkClassName = useCallback(
    (linkTitle: 'Home' | 'About') => {
      return clsx(BASE_LINK_CLASSNAME, {
        'after:w-[75%] text-secondary-900': activeLinkTitle === linkTitle,
      })
    },
    [activeLinkTitle],
  )

  const toggleHamburgerMenu = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded)
    toggleDialogOpen(hamburgerMenuRef.current)
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
        onClick={toggleHamburgerMenu}
        type="button"
      >
        <Hamburger className="text-[2.5rem] sm:hidden" />
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
            className="mb-4 ml-auto block pr-4 text-heading-sm font-medium"
            onClick={toggleHamburgerMenu}
            type="button"
          >
            X
          </button>
          <nav>
            <ul className="flex flex-col gap-4 pl-4 pr-20 font-bold">
              <li>
                <Link
                  className={getLinkClassName('Home')}
                  data-testid="mobile-home-link"
                  href={ROUTES.home}
                  onClick={toggleHamburgerMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={getLinkClassName('About')}
                  href={ROUTES.about}
                  onClick={toggleHamburgerMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className={BASE_LINK_CLASSNAME}
                  href={ROUTES.login}
                  onClick={toggleHamburgerMenu}
                >
                  Login
                </Link>
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
