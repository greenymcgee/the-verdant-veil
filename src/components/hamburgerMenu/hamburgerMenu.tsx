// Safe to ignore since the close button is interactive and tabbable. Making the
// margin interactive would confuse the keyboard user.
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'
import React, { HTMLAttributes, RefObject } from 'react'
import clsx from 'clsx'
import { RemoveScroll } from 'react-remove-scroll'

import { useCloseOnOutsideClick } from '@/hooks'

import { Hamburger } from '../svgs/hamburger'

interface HamburgerMenuProps extends HTMLAttributes<HTMLDivElement> {
  expanded: boolean
  ref: RefObject<HTMLDialogElement | null>
  toggleDialog: VoidFunction
}

export function HamburgerMenu({
  children,
  expanded,
  ref,
  toggleDialog,
  ...options
}: HamburgerMenuProps) {
  const handleOutsideClick = useCloseOnOutsideClick(ref, toggleDialog)

  return (
    <div {...options}>
      <button
        aria-controls="hamburger-menu"
        aria-expanded={expanded}
        aria-label="Open Hamburger Menu"
        onClick={toggleDialog}
        type="button"
      >
        <Hamburger className="text-heading-xl" />
      </button>
      <dialog
        className={clsx(
          'fixed m-0 ml-auto min-h-screen transform',
          'bg-white transition-transform duration-100 ease-linear',
          'backdrop:bg-neutral-900 backdrop:opacity-60',
          { 'translate-x-full': !expanded },
        )}
        data-testid="hamburger-menu"
        id="hamburger-menu"
        onClick={handleOutsideClick}
        ref={ref}
      >
        <div className="min-h-[inherit]">
          <RemoveScroll enabled={expanded}>{children}</RemoveScroll>
        </div>
      </dialog>
    </div>
  )
}

/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-enable jsx-a11y/click-events-have-key-events */
