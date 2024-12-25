import { fireEvent, renderHook } from '@testing-library/react'

import { useScrollPosition } from '..'

describe('useScrollPosition', () => {
  it('should return the scroll position', () => {
    const { result } = renderHook(() => useScrollPosition())
    fireEvent.scroll(window, { target: { scrollX: 200, scrollY: 100 } })
    expect(result.current).toEqual({ x: 200, y: 100 })
  })
})
