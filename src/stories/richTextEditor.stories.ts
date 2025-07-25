import type { Meta, StoryObj } from '@storybook/nextjs'

import { RichTextEditor } from '@/components'

const meta = {
  argTypes: {},
  args: { content: '<p>Rich text</p>' },
  component: RichTextEditor,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/RichTextEditor',
} satisfies Meta<typeof RichTextEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
