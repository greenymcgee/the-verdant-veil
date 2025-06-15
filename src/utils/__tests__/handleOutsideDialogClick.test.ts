import { SyntheticEvent } from 'react'

import { handleOutsideDialogClick } from '..'

const toggleDialog = vi.fn()

afterEach(() => {
  vi.clearAllMocks()
})

describe('handleOutsideDialogClick', () => {
  it('should do nothing when the event target is not the dialog', () => {
    const dialog = document.createElement('dialog')
    const event = {
      target: dialog,
    } as unknown as SyntheticEvent<HTMLDialogElement>
    handleOutsideDialogClick(null, toggleDialog)(event)
    expect(toggleDialog).not.toHaveBeenCalled()
  })

  it('should toggle the dialog when the target matches', () => {
    const dialog = document.createElement('dialog')
    const event = {
      target: dialog,
    } as unknown as SyntheticEvent<HTMLDialogElement>
    handleOutsideDialogClick(dialog, toggleDialog)(event)
    expect(toggleDialog).toHaveBeenCalled()
  })
})
