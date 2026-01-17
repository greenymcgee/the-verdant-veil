import { RefObject, SyntheticEvent, useCallback } from 'react'

export function useCloseOnOutsideClick(
  dialogElementRef: RefObject<HTMLDialogElement | null>,
  toggleDialog: VoidFunction,
) {
  return useCallback(
    (event: SyntheticEvent<HTMLDialogElement>) => {
      if (event.target !== dialogElementRef.current) return

      toggleDialog()
    },
    [dialogElementRef, toggleDialog],
  )
}
