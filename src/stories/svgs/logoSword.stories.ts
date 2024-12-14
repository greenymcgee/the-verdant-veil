import type { Meta, StoryObj } from '@storybook/react'

import { LogoSword } from '@/components'

const meta = {
  component: LogoSword,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/svgs/LogoSword',
} satisfies Meta<typeof LogoSword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { className: 'text-[20rem] text-neutral-900' },
}
