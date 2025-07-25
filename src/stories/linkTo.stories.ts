import type { Meta, StoryObj } from '@storybook/nextjs'

import { LinkTo } from '@/components'

const meta = {
  argTypes: {
    leftIcon: { control: 'text' },
    rightIcon: { control: 'text' },
    theme: {
      control: 'radio',
      options: ['primary', 'secondary', 'success', 'neutral', 'danger'],
    },
    variant: {
      control: 'radio',
      options: ['outline', 'solid'],
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
export const Variant: Story = { args: { href: '/games', variant: 'solid' } }
export const LeftIcon: Story = {
  args: { href: '/games', leftIcon: 'image', variant: 'solid' },
}
export const RightIcon: Story = {
  args: { href: '/games', rightIcon: 'image', variant: 'solid' },
}
