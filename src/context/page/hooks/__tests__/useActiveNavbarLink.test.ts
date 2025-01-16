import { renderHook } from '@testing-library/react'

import { Providers } from '@/context'

import { useSetActiveNavbarLink } from '..'

describe('useSetActiveNavbarLink', () => {
  it('should set the activeLink', () => {
    const { result } = renderHook(() => useSetActiveNavbarLink('about'), {
      wrapper: Providers,
    })
    expect(result.current).toEqual('about')
  })
})
