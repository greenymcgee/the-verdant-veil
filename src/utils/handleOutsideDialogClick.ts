import { SyntheticEvent } from 'react'

export function handleOutsideDialogClick(
  dialogElement: HTMLDialogElement | null,
  toggleDialog: VoidFunction,
) {
  return (event: SyntheticEvent<HTMLDialogElement>) => {
    if (event.target !== dialogElement) return

    toggleDialog()
  }
}
