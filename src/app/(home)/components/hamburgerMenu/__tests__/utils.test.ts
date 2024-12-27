import { act } from '@testing-library/react'

import { toggleDialogOpen } from '../utils'

describe('toggleDialogOpen', () => {
  it('should do nothing when the dialog is blank', () => {
    expect(toggleDialogOpen(null)).toBeUndefined()
  })

  it("should close the dialog if it's open", async () => {
    const dialog = document.createElement('dialog')
    dialog.open = true
    toggleDialogOpen(dialog)
    await act(async () => {
      await new Promise((resolve) => setTimeout(() => resolve(''), 100))
    })
    expect(dialog.open).toEqual(false)
  })

  it("should open the dialog if it's closed", () => {
    const dialog = document.createElement('dialog')
    toggleDialogOpen(dialog)
    expect(dialog.open).toEqual(true)
  })
})
