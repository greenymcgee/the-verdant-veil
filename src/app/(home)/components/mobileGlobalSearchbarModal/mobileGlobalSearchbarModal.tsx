/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react'
import clsx from 'clsx'
import { RemoveScroll } from 'react-remove-scroll'

import { Icon } from '@/components'
import { INPUT_CLASS_NAMES_MAP } from '@/components/input/constants'
import { useDialogToggle } from '@/hooks'
import { handleOutsideDialogClick } from '@/utils'

import { GlobalSearchbar } from '../globalSearchbar'

export function MobileGlobalSearchbarModal() {
  const ref = useRef(null)
  const { expanded, toggleDialog } = useDialogToggle(ref, {
    animationDuration: 300,
  })

  return (
    <>
      <button
        aria-controls="mobile-global-searchbar-modal"
        aria-expanded={expanded}
        className={clsx(
          'flex cursor-pointer items-center bg-white sm:hidden',
          INPUT_CLASS_NAMES_MAP.text,
        )}
        data-testid="mobile-global-searchbar-toggle"
        onClick={toggleDialog}
        type="button"
      >
        <Icon className="text-heading-md text-neutral-500" icon="magnify" />{' '}
        <span className="text-neutral-400">Search</span>
      </button>
      <dialog
        className={clsx(
          'max-w-unset fixed top-0 left-0 w-screen overflow-visible rounded-lg bg-transparent',
          'transition-transform duration-300 ease-out backdrop:bg-neutral-900/30',
        )}
        data-testid="mobile-global-searchbar-modal"
        id="mobile-global-searchbar-modal"
        onClick={handleOutsideDialogClick(ref.current, toggleDialog)}
        ref={ref}
      >
        <RemoveScroll enabled={expanded}>
          <GlobalSearchbar
            autoFocus
            className={clsx('transition-transform duration-300 ease-out', {
              '-translate-y-full': !expanded,
            })}
          />
        </RemoveScroll>
        <button
          aria-label="Close Global Searchbar"
          className={clsx(
            'absolute left-1/2 -translate-x-1/2 rounded-full bg-white p-1 text-3xl',
            'transition-bottom duration-400 ease-out',
            { '-bottom-[110vh]': !expanded, '-bottom-[90vh]': expanded },
          )}
          onClick={toggleDialog}
          type="button"
        >
          <Icon icon="close" />
        </button>
      </dialog>
    </>
  )
}

/* eslint-enable jsx-a11y/no-autofocus */
/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-enable jsx-a11y/click-events-have-key-events */
