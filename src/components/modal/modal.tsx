/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'
import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  RefObject,
  SyntheticEvent,
  useState,
} from 'react'
import clsx from 'clsx'

import { toggleModalDialog } from '@/utils'

interface ModalProps extends PropsWithChildren {
  Toggle(props: HTMLAttributes<HTMLButtonElement>): ReactElement
  id: string
  ref: RefObject<HTMLDialogElement | null>
}

export function Modal({ Toggle, children, id, ref }: ModalProps) {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded((prevExpanded) => !prevExpanded)

  const toggleModal = () => {
    toggleExpanded()
    toggleModalDialog(ref.current)
  }

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
        onClick={toggleModal}
      />
      <dialog
        className={clsx(
          'translate-y-full rounded-lg transition-transform duration-300 ease-out',
          'backdrop:bg-neutral-900 backdrop:opacity-20',
        )}
        data-testid={id}
        id={id}
        onClick={handleOutsideContentClick}
        onClose={toggleExpanded}
        ref={ref}
      >
        {children}
      </dialog>
    </>
  )
}

/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-enable jsx-a11y/click-events-have-key-events */
