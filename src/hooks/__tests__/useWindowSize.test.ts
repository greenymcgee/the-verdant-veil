import { renderHook } from '@testing-library/react'

import { useWindowSize } from '../useWindowSize'

afterEach(() => {
  vi.stubGlobal('innerHeight', 0)
  vi.stubGlobal('innerWidth', 0)
  vi.restoreAllMocks()
})

describe('useWindowSize', () => {
  it('should set the initial size', () => {
    vi.stubGlobal('innerHeight', 32)
    vi.stubGlobal('innerWidth', 40)
    const { result } = renderHook(() => useWindowSize())
    expect(result.current).toEqual({ height: 32, width: 40 })
  })

  it('should add a resize listener', () => {
    vi.spyOn(window, 'addEventListener')
    renderHook(() => useWindowSize())
    expect(window.addEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    )
  })

  it('should remove a resize listener', () => {
    vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useWindowSize())
    unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    )
  })
})
