'use client'
import { RefObject, useCallback } from 'react'

import { toggleModalDialog } from '@/utils'

export function useModalDialogToggle(ref: RefObject<HTMLDialogElement | null>) {
  return useCallback(() => toggleModalDialog(ref.current), [ref])
}
