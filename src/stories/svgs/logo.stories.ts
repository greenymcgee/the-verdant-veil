import type { Meta, StoryObj } from '@storybook/react'

import { Logo } from '@/components'

const meta = {
  component: Logo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/svgs/Logo',
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { className: 'text-[20rem] text-neutral-900' },
}
