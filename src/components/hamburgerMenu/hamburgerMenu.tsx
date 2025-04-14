// Safe to ignore since the close button is interactive and tabbable. Making the
// margin interactive would confuse the keyboard user.
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'
import React, {
  HTMLAttributes,
  RefObject,
  SyntheticEvent,
  useState,
} from 'react'
import clsx from 'clsx'
import { RemoveScroll } from 'react-remove-scroll'

import { toggleSidebarDialog } from '@/utils'

import { Hamburger } from '../svgs/hamburger'

interface HamburgerMenuProps extends HTMLAttributes<HTMLDivElement> {
  ref: RefObject<HTMLDialogElement | null>
}

export function HamburgerMenu({
  children,
  ref,
  ...options
}: HamburgerMenuProps) {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded((prevExpanded) => !prevExpanded)
  const toggleHamburgerMenu = () => toggleSidebarDialog(ref.current)

  const openDialog = () => {
    toggleExpanded()
    toggleHamburgerMenu()
  }

  const toggleLeftoverStates = () => toggleExpanded()

  const handleOutsideContentClick = (
    event: SyntheticEvent<HTMLDialogElement>,
  ) => {
    if (event.target !== ref.current) return

    toggleHamburgerMenu()
  }

  return (
    <div {...options}>
      <button
        aria-controls="hamburger-menu"
        aria-expanded={expanded}
        aria-label="Open Hamburger Menu"
        onClick={openDialog}
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
        onClose={toggleLeftoverStates}
        ref={ref}
      >
        <div className="min-h-[inherit]">
          {expanded ? <RemoveScroll>{children}</RemoveScroll> : children}
        </div>
      </dialog>
    </div>
  )
}

/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-enable jsx-a11y/click-events-have-key-events */
