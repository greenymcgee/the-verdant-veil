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
  useState,
} from 'react'
import clsx from 'clsx'
import { RemoveScroll } from 'react-remove-scroll'

import { useModalDialogToggle } from '@/hooks'

interface ModalProps extends PropsWithChildren {
  Toggle(props: HTMLAttributes<HTMLButtonElement>): ReactElement
  id: string
  ref: RefObject<HTMLDialogElement | null>
}

export function Modal({ Toggle, children, id, ref }: ModalProps) {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded((prevExpanded) => !prevExpanded)
  const toggleModal = useModalDialogToggle(ref)

  const openDialog = useCallback(() => {
    toggleExpanded()
    toggleModal()
  }, [toggleModal])

  const toggleLeftoverStates = useCallback(() => {
    toggleExpanded()
  }, [])

  const handleOutsideContentClick = (
    event: SyntheticEvent<HTMLDialogElement>,
  ) => {
    if (event.target !== ref.current) return

    toggleModal()
  }

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
          'bg-white transition-transform backdrop:bg-neutral-900/30',
        )}
        data-testid={id}
        id={id}
        onClick={handleOutsideContentClick}
        onClose={toggleLeftoverStates}
        ref={ref}
      >
        {expanded ? <RemoveScroll>{children}</RemoveScroll> : children}
      </dialog>
    </>
  )
}

/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-enable jsx-a11y/click-events-have-key-events */
