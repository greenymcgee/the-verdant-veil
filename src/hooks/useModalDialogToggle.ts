'use client'
import { RefObject, useCallback } from 'react'

import { usePageContext } from '@/context'
import { toggleModalDialog } from '@/utils'

export function useModalDialogToggle(ref: RefObject<HTMLDialogElement | null>) {
  const { isIOSDevice } = usePageContext()
  return useCallback(() => {
    toggleModalDialog(ref.current, !isIOSDevice)
  }, [isIOSDevice, ref])
}
