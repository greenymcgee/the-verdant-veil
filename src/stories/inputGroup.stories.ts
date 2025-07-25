import type { Meta, StoryObj } from '@storybook/nextjs'

import { InputGroup } from '@/components'

const meta = {
  component: InputGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/InputGroup',
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const TextGroup: Story = {
  args: { id: 'text', label: 'What is your favorite color?' },
}
export const CheckboxGroup: Story = {
  args: {
    id: 'checkbox',
    inputProps: { type: 'checkbox' },
    label: 'Required?',
  },
}
export const DateGroup: Story = {
  args: {
    id: 'date',
    inputProps: { type: 'date' },
    label: 'Start Date',
  },
}
export const DateTimeGroup: Story = {
  args: {
    id: 'datetime-local',
    inputProps: { type: 'datetime-local' },
    label: 'Start Date',
  },
}
export const EmailGroup: Story = {
  args: {
    id: 'email',
    inputProps: { type: 'email' },
    label: 'Email',
  },
}
export const FileGroup: Story = {
  args: {
    id: 'file',
    inputProps: { type: 'file' },
    label: 'Image',
  },
}
export const NumberGroup: Story = {
  args: {
    id: 'number',
    inputProps: { type: 'number' },
    label: 'Capacity',
  },
}
export const PasswordGroup: Story = {
  args: {
    id: 'password',
    inputProps: { type: 'password' },
    label: 'Password',
  },
}
export const RadioGroup: Story = {
  args: {
    id: 'radio',
    inputProps: { type: 'radio' },
    label: 'Which one?',
  },
}
export const SearchGroup: Story = {
  args: {
    id: 'search',
    inputProps: { type: 'search' },
    label: 'Search',
  },
}
