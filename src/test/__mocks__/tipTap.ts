import { Editor } from '@tiptap/react'

export const TIP_TAP_EDITOR: Editor = {
  chain: vi.fn().mockReturnValue({
    focus: vi.fn().mockReturnValue({
      extendMarkRange: vi.fn().mockReturnValue({
        setLink: vi.fn().mockReturnValue({ run: vi.fn() }),
        unsetLink: vi.fn().mockReturnValue({ run: vi.fn() }),
      }),
      setHardBreak: vi.fn().mockReturnValue({ run: vi.fn() }),
      setHeading: vi.fn().mockReturnValue({ run: vi.fn() }),
      toggleBold: vi.fn().mockReturnValue({ run: vi.fn() }),
      toggleItalic: vi.fn().mockReturnValue({ run: vi.fn() }),
      unsetLink: vi.fn().mockReturnValue({ run: vi.fn() }),
    }),
  }),
  getAttributes: vi.fn().mockReturnValue({}),
  isActive: vi.fn().mockImplementation(() => true),
} as unknown as Editor
