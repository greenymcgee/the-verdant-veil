import type { Meta, StoryObj } from '@storybook/react'

import { LinkTo } from '@/components'

const meta = {
  argTypes: {
    theme: {
      control: 'radio',
      options: ['primary', 'secondary', 'success', 'neutral', 'danger'],
    },
  },
  args: { children: 'Games' },
  component: LinkTo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/LinkTo',
} satisfies Meta<typeof LinkTo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { href: '/games' } }
export const Secondary: Story = { args: { href: '/games', theme: 'secondary' } }
export const Success: Story = { args: { href: '/games', theme: 'success' } }
export const Neutral: Story = { args: { href: '/games', theme: 'neutral' } }
export const Danger: Story = { args: { href: '/games', theme: 'danger' } }
