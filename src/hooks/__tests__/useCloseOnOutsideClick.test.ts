import { SyntheticEvent } from 'react'
import { renderHook } from '@testing-library/react'

import { useCloseOnOutsideClick } from '..'

const toggleDialog = vi.fn()

afterEach(() => {
  vi.clearAllMocks()
})

describe('useCloseOnOutsideClick', () => {
  it("should do nothing when the target is the dialog's content", () => {
    const { result } = renderHook(() =>
      useCloseOnOutsideClick({ current: null }, toggleDialog),
    )
    result.current({} as SyntheticEvent<HTMLDialogElement>)
    expect(toggleDialog).not.toHaveBeenCalled()
  })

  it('should call toggleDialog when the target is the dialog', () => {
    const dialog = {} as HTMLDialogElement
    const { result } = renderHook(() =>
      useCloseOnOutsideClick({ current: dialog }, toggleDialog),
    )
    result.current({
      target: dialog,
    } as unknown as SyntheticEvent<HTMLDialogElement>)
    expect(toggleDialog).toHaveBeenCalledTimes(1)
  })
})
