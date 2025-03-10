/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'
import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  RefObject,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock'
import clsx from 'clsx'

import { usePageContext } from '@/context'
import { useModalDialogToggle } from '@/hooks'

interface ModalProps extends PropsWithChildren {
  Toggle(props: HTMLAttributes<HTMLButtonElement>): ReactElement
  id: string
  ref: RefObject<HTMLDialogElement | null>
}

export function Modal({ Toggle, children, id, ref }: ModalProps) {
  const {
    userAgent: { isIOSDevice },
  } = usePageContext()
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded((prevExpanded) => !prevExpanded)
  const toggleModal = useModalDialogToggle(ref)

  const toggleBodyScrollLock = useCallback(() => {
    const dialog = ref.current as HTMLDialogElement
    if (expanded) return enableBodyScroll(dialog)

    disableBodyScroll(dialog)
  }, [expanded, ref])

  const openDialog = useCallback(() => {
    toggleBodyScrollLock()
    toggleExpanded()
    toggleModal()
  }, [toggleBodyScrollLock, toggleModal])

  const toggleLeftoverStates = useCallback(() => {
    toggleExpanded()
    toggleBodyScrollLock()
  }, [toggleBodyScrollLock])

  const handleOutsideContentClick = (
    event: SyntheticEvent<HTMLDialogElement>,
  ) => {
    if (event.target !== ref.current) return

    toggleModal()
  }

  useEffect(() => () => clearAllBodyScrollLocks(), [])

  return (
    <>
      <Toggle
        aria-controls={id}
        aria-expanded={expanded}
        onClick={openDialog}
      />
      <dialog
        className={clsx(
          'top-[50%] left-[50%] -translate-x-[50%] rounded-lg duration-300 ease-out',
          'backdrop:bg-neutral-900/30',
          {
            '-translate-y-[50%]': isIOSDevice,
            'transition-transform': !isIOSDevice,
          },
        )}
        data-testid={id}
        id={id}
        onClick={handleOutsideContentClick}
        onClose={toggleLeftoverStates}
        ref={ref}
      >
        {children}
      </dialog>
    </>
  )
}

/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-enable jsx-a11y/click-events-have-key-events */
