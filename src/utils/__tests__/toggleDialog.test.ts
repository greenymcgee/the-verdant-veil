import { sleep } from '@/test/helpers'

import { toggleDialog } from '..'

const toggleExpanded = vi.fn()

afterEach(() => {
  vi.clearAllMocks()
})

describe('toggleDialog', () => {
  it('should do nothing if the dialog is blank', async () => {
    await toggleDialog(null, toggleExpanded)
    expect(toggleExpanded).not.toHaveBeenCalled()
  })

  it('should open the dialog if it is closed', async () => {
    const dialog = document.createElement('dialog')
    await toggleDialog(dialog, toggleExpanded)
    expect(dialog.open).toBe(true)
    expect(toggleExpanded).toHaveBeenCalled()
  })

  it('should close the dialog if it is open', async () => {
    const dialog = document.createElement('dialog')
    dialog.open = true
    await toggleDialog(dialog, toggleExpanded)
    expect(dialog.open).toBe(false)
    expect(toggleExpanded).toHaveBeenCalled()
  })

  describe('options', () => {
    it('should accept an animationDuration', async () => {
      const dialog = document.createElement('dialog')
      dialog.open = true
      toggleDialog(dialog, toggleExpanded, { animationDuration: 10 })
      await sleep(10)
      expect(dialog.open).toBe(false)
      expect(toggleExpanded).toHaveBeenCalled()
    })
  })
})
