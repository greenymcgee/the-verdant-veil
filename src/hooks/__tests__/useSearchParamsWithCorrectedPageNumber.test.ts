import { renderHook } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { useSearchParamsWithCorrectedPageNumber } from '..'

afterEach(() => {
  mockRouter.query = {}
})

describe('useSearchParamsWithCorrectedPageNumber', () => {
  it('should set the page to itself + 1 if it is present', () => {
    mockRouter.query = { page: '1' }
    const { result } = renderHook(() =>
      useSearchParamsWithCorrectedPageNumber(),
    )
    expect((result.current as URLSearchParams).get('page')).toEqual('2')
  })

  it('should return searchParams if page is blank', () => {
    const { result } = renderHook(() =>
      useSearchParamsWithCorrectedPageNumber(),
    )
    expect((result.current as URLSearchParams).get('page')).toBeNull()
  })
})
