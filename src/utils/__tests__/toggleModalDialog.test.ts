import { act } from '@testing-library/react'

import { toggleModalDialog } from '..'

describe('toggleModalDialog', () => {
  it('should do nothing when the dialog is blank', () => {
    expect(toggleModalDialog(null)).toBeUndefined()
  })

  it("should close the dialog if it's open", async () => {
    const dialog = document.createElement('dialog')
    dialog.open = true
    toggleModalDialog(dialog)
    await act(async () => {
      await new Promise((resolve) => setTimeout(() => resolve(''), 300))
    })
    expect(dialog.open).toBe(false)
  })

  it("should open the dialog if it's closed", () => {
    const dialog = document.createElement('dialog')
    toggleModalDialog(dialog)
    expect(dialog.open).toBe(true)
  })
})
