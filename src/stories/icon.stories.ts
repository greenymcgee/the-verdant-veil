import type { Meta, StoryObj } from '@storybook/react'

import { Icon } from '@/components'

const meta = {
  args: { className: 'text-heading-md text-primary-900' },
  component: Icon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/Icon',
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const FilterAlt: Story = { args: { icon: 'filter-alt' } }
export const Magnify: Story = { args: { icon: 'magnify' } }
export const User: Story = { args: { icon: 'user' } }
export const Videogame: Story = { args: { icon: 'videogame' } }
