import React from 'react'
import { render, screen } from '@testing-library/react'

import { Td } from '@/components/td'
import { Th } from '@/components/th'
import { Tr } from '@/components/tr'

import { Table } from '..'

describe('<Table />', () => {
  it('should render', () => {
    render(
      <Table
        data-testid="table"
        header={
          <>
            <Th text="First Name" />
            <Th text="Last Name" />
          </>
        }
      >
        <Tr>
          <Td text="Bill" />
          <Td text="Withers" />
        </Tr>
        <Tr>
          <Td text="Samuel" />
          <Td text="Adams" />
        </Tr>
      </Table>,
    )
    expect(screen.getByTestId('table')).toBeVisible()
  })
})
