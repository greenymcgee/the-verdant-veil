import { act } from 'react'
import { renderHook } from '@testing-library/react'

import { useDialogToggle } from '..'

describe('useDialogToggle', () => {
  it('should return a toggle method and the expanded state', async () => {
    const ref = { current: document.createElement('dialog') }
    const { result } = renderHook(() => useDialogToggle(ref))
    await act(async () => await result.current.toggleDialog())
    expect(result.current.expanded).toBe(true)
  })
})
