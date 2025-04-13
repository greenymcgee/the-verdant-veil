import { act, renderHook } from '@testing-library/react'

import { useToggle } from '../useToggle'

describe('useToggle', () => {
  it('should use the initialState when given', () => {
    const { result } = renderHook(() => useToggle(true))
    const [, toggleBool] = result.current
    act(() => toggleBool())
    expect(result.current.at(0)).toBe(false)
  })

  it('should return a boolean and a function to toggle it', () => {
    const { result } = renderHook(() => useToggle())
    const [, toggleBool] = result.current
    act(() => toggleBool())
    expect(result.current.at(0)).toBe(true)
  })
})
