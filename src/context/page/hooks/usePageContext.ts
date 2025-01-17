'use client'
import { useContext } from 'react'

import { PageContext } from '../context'

export function usePageContext() {
  return useContext(PageContext)
}
