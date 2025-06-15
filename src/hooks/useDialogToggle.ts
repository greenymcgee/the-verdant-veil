'use client'
import { RefObject, useCallback } from 'react'

import { toggleDialog as toggleDialogUtil } from '@/utils'

import { useToggle } from './useToggle'

type Ref = RefObject<HTMLDialogElement | null>
type Options = ThirdParameterOf<typeof toggleDialogUtil>

export function useDialogToggle(ref: Ref, options?: Options) {
  const [expanded, toggleExpanded] = useToggle()

  const toggleDialog = useCallback(async () => {
    await toggleDialogUtil(ref.current, toggleExpanded, options)
  }, [options, ref, toggleExpanded])

  return { expanded, toggleDialog }
}
