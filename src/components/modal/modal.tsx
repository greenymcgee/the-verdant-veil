/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'
import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  RefObject,
} from 'react'
import clsx from 'clsx'
import { RemoveScroll } from 'react-remove-scroll'

import { useCloseOnOutsideClick } from '@/hooks'

interface ModalProps extends PropsWithChildren {
  Toggle(props: HTMLAttributes<HTMLButtonElement>): ReactElement
  expanded: boolean
  id: string
  ref: RefObject<HTMLDialogElement | null>
  toggleDialog: VoidFunction
}

export function Modal({
  Toggle,
  children,
  expanded,
  id,
  ref,
  toggleDialog,
}: ModalProps) {
  const handleOutsideClick = useCloseOnOutsideClick(ref, toggleDialog)

  return (
    <>
      <Toggle
        aria-controls={id}
        aria-expanded={expanded}
        onClick={toggleDialog}
      />
      <dialog
        className={clsx(
          'top-[50%] left-[50%] -translate-x-[50%] rounded-lg duration-300 ease-out',
          'bg-white transition-transform backdrop:bg-neutral-900/30',
          { '-translate-y-[50%]': expanded },
        )}
        data-testid={id}
        id={id}
        onClick={handleOutsideClick}
        ref={ref}
      >
        <RemoveScroll enabled={expanded}>{children}</RemoveScroll>
      </dialog>
    </>
  )
}

/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-enable jsx-a11y/click-events-have-key-events */
