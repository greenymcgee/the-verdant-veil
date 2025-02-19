import { act, waitFor } from '@testing-library/react'

import { sleep } from '@/test/helpers'

import { toggleModalDialog } from '..'

describe('toggleModalDialog', () => {
  it('should do nothing when the dialog is blank', () => {
    expect(toggleModalDialog(null, true)).toBeUndefined()
  })

  it("should close the dialog if it's open", async () => {
    const dialog = document.createElement('dialog')
    dialog.open = true
    toggleModalDialog(dialog, true)
    await act(async () => await sleep(200))
    expect(dialog.open).toBe(false)
  })

  it("should open the dialog if it's closed", () => {
    const dialog = document.createElement('dialog')
    toggleModalDialog(dialog, true)
    expect(dialog.open).toBe(true)
  })

  describe('shouldAnimate', () => {
    describe('false', () => {
      it('should not remove any classNames', () => {
        const dialog = document.createElement('dialog')
        vi.spyOn(dialog.classList, 'remove')
        dialog.open = true
        toggleModalDialog(dialog, false)
        expect(dialog.classList.remove).not.toHaveBeenCalled()
      })

      it('should not add any classNames', async () => {
        const dialog = document.createElement('dialog')
        vi.spyOn(dialog.classList, 'add')
        toggleModalDialog(dialog, false)
        await waitFor(async () => await sleep())
        expect(dialog.classList.add).not.toHaveBeenCalled()
      })
    })

    describe('true', () => {
      it('should remove the translate className', () => {
        const dialog = document.createElement('dialog')
        vi.spyOn(dialog.classList, 'remove')
        dialog.open = true
        toggleModalDialog(dialog, true)
        expect(dialog.classList.remove).toHaveBeenCalledWith(
          '-translate-y-[50%]',
        )
      })

      it('should add the translate className', async () => {
        const dialog = document.createElement('dialog')
        vi.spyOn(dialog.classList, 'add')
        toggleModalDialog(dialog, true)
        await waitFor(async () => await sleep())
        expect(dialog.classList.add).toHaveBeenCalledWith('-translate-y-[50%]')
      })
    })
  })
})
