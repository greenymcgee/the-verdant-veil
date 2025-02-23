import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { LinkTo, Table, Td, Th, Tr } from '@/components'

const meta = {
  args: {
    children: (
      <>
        <Tr>
          <Td>
            <LinkTo href="/" text="Bill" />
          </Td>
          <Td text="Withers" />
        </Tr>
        <Tr>
          <Td>
            <LinkTo href="/" text="Samuel" />
          </Td>
          <Td text="Adams" />
        </Tr>
      </>
    ),
    header: (
      <>
        <Th text="First Name" />
        <Th text="Last Name" />
      </>
    ),
  },
  component: Table,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
