import { TIP_TAP_EDITOR } from '@/test'

import { handleHeadingClicked } from '..'

describe('handleHeadingClicked', () => {
  it('should set heading at level', () => {
    const level = 2
    handleHeadingClicked(TIP_TAP_EDITOR, level)()
    expect(
      TIP_TAP_EDITOR.chain().focus().setHeading({ level }).run,
    ).toHaveBeenCalled()
  })
})
