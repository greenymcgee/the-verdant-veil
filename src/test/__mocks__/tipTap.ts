import { Editor } from '@tiptap/react'

export const TIP_TAP_EDITOR: Editor = {
  chain: vi.fn().mockReturnValue({
    focus: vi.fn().mockReturnValue({
      setHeading: vi.fn().mockReturnValue({ run: vi.fn() }),
      toggleBold: vi.fn().mockReturnValue({ run: vi.fn() }),
      toggleItalic: vi.fn().mockReturnValue({ run: vi.fn() }),
    }),
  }),
  isActive: vi.fn().mockImplementation(() => true),
} as unknown as Editor
