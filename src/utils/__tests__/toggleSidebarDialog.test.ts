import { act } from '@testing-library/react'

import { toggleSidebarDialog } from '..'

describe('toggleSidebarDialog', () => {
  it('should do nothing when the dialog is blank', () => {
    expect(toggleSidebarDialog(null)).toBeUndefined()
  })

  it("should close the dialog if it's open", async () => {
    const dialog = document.createElement('dialog')
    dialog.open = true
    toggleSidebarDialog(dialog)
    await act(async () => {
      await new Promise((resolve) => setTimeout(() => resolve(''), 100))
    })
    expect(dialog.open).toEqual(false)
  })

  it("should open the dialog if it's closed", () => {
    const dialog = document.createElement('dialog')
    toggleSidebarDialog(dialog)
    expect(dialog.open).toEqual(true)
  })
})
