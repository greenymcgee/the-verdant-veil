import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components'

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
  args: { children: 'Button' },
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Secondary: Story = { args: { theme: 'secondary' } }
export const Success: Story = { args: { theme: 'success' } }
export const Neutral: Story = { args: { theme: 'neutral' } }
export const Danger: Story = { args: { theme: 'danger' } }
export const Small: Story = { args: { size: 'sm' } }
export const Medium: Story = { args: { size: 'md' } }
export const Large: Story = { args: { size: 'lg' } }
export const Outline: Story = { args: { variant: 'outline' } }
export const LeftIcon: Story = { args: { leftIcon: 'filter-alt' } }
export const RightIcon: Story = { args: { rightIcon: 'plus-thick' } }
