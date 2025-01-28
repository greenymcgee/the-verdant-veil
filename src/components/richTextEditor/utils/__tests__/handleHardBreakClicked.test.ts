import { TIP_TAP_EDITOR } from '@/test'

import { handleHardBreakClicked } from '..'

describe('handleHardBreakClicked', () => {
  it('should add a hard break', () => {
    handleHardBreakClicked(TIP_TAP_EDITOR)()
    expect(TIP_TAP_EDITOR.chain().focus().setHardBreak().run).toHaveBeenCalled()
  })
})
