import { TIP_TAP_EDITOR } from '@/test'

import { handleUnsetLinkClicked } from '..'

describe('handleUnsetLinkClicked', () => {
  it('should toggle unset link', () => {
    handleUnsetLinkClicked(TIP_TAP_EDITOR)()
    expect(TIP_TAP_EDITOR.chain().focus().unsetLink().run).toHaveBeenCalled()
  })
})
