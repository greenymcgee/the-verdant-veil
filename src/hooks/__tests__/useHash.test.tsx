import React from 'react'
import {
  act,
  fireEvent,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react'

import { useHash } from '..'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('useHash', () => {
  it('should set the initial hash', () => {
    vi.stubGlobal('location', { hash: '#review' })
    const { result } = renderHook(() => useHash())
    act(() => expect(result.current).toBe('#review'))
  })

  it('should set the updated hash', async () => {
    const { result } = renderHook(() => useHash(), {
      wrapper({ children }) {
        return (
          <>
            <a href="#about">About</a>
            {children}
          </>
        )
      },
    })
    fireEvent.click(screen.getByText('About'))
    await waitFor(() => expect(result.current).toBe('#about'))
  })

  it('should remove the event listener', async () => {
    vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useHash())
    unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'hashchange',
      expect.any(Function),
    )
  })
})
