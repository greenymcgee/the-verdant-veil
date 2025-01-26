import { TIP_TAP_EDITOR } from '@/test'

import { handleBoldClicked } from '..'

describe('handleBoldClicked', () => {
  it('should toggle bold', () => {
    handleBoldClicked(TIP_TAP_EDITOR)()
    expect(TIP_TAP_EDITOR.chain().focus().toggleBold().run).toHaveBeenCalled()
  })
})
