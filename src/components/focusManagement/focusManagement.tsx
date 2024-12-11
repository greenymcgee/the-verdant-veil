'use client'

import React, { useEffect } from 'react'

import { FocusOutlineManager } from '@/modules'

export function FocusManagement() {
  useEffect(() => {
    const manager = new FocusOutlineManager()
    manager.start()
    return () => {
      manager.stop()
    }
  }, [])

  return <></>
}
