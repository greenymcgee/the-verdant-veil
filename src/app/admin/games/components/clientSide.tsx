'use client'
import React from 'react'

import { useSetActiveNavbarLink } from '@/context'

export function AdminGamesClientSide() {
  useSetActiveNavbarLink('adminGames')
  return <>{}</>
}
