import { act } from '@testing-library/react'

import { renderHookWithProviders, sleep } from '@/test/helpers'

import { useSetActiveNavbarLink } from '..'

describe('useSetActiveNavbarLink', () => {
  it('should set the activeLink', async () => {
    const { result } = renderHookWithProviders(() =>
      useSetActiveNavbarLink('about'),
    )
    await act(async () => await sleep())
    expect(result.current).toBe('about')
  })
})
