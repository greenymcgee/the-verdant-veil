import type { Meta, StoryObj } from '@storybook/react'

import { Input } from '@/components'

const meta = {
  argTypes: {
    type: {
      control: 'select',
      description: 'An HTML input type.',
      options: [
        'checkbox',
        'date',
        'datetime-local',
        'email',
        'file',
        'number',
        'password',
        'radio',
        'search',
        'text',
      ],
    },
  },
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {}
export const Email: Story = { args: { type: 'email' } }
export const Password: Story = { args: { type: 'password' } }
export const Search: Story = { args: { type: 'search' } }
export const Checkbox: Story = { args: { type: 'checkbox' } }
export const Radio: Story = { args: { type: 'radio' } }
export const File: Story = { args: { type: 'file' } }
export const Number: Story = { args: { type: 'number' } }
export const Date: Story = { args: { type: 'date' } }
export const DatetimeLocal: Story = { args: { type: 'datetime-local' } }
