import { TIP_TAP_EDITOR } from '@/test'

import { handleItalicClicked } from '..'

describe('handleItalicClicked', () => {
  it('should toggle italic', () => {
    handleItalicClicked(TIP_TAP_EDITOR)()
    expect(TIP_TAP_EDITOR.chain().focus().toggleItalic().run).toHaveBeenCalled()
  })
})
