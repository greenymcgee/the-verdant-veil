import { renderHook } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'

import { useLoginRedirectUrl } from '..'

describe('useLoginRedirectUrl', () => {
  it('should return the home pathname when the redirect param is blank', () => {
    const { result } = renderHook(() => useLoginRedirectUrl())
    expect(result.current).toEqual(ROUTES.home)
  })

  it('should return the redirect param when it is present', () => {
    const redirect = '/admin/games'
    mockRouter.push(`/login?redirect=${redirect}`)
    const { result } = renderHook(() => useLoginRedirectUrl())
    expect(result.current).toEqual(redirect)
  })
})
