import React from 'react'
import { render, screen } from '@testing-library/react'

import { homeServer } from '@/test/servers'

import HomePage from '../page'

beforeAll(() => homeServer.listen())
afterEach(() => homeServer.resetHandlers())
afterAll(() => homeServer.close())

describe('<HomePage />', () => {
  it('should render an h1', async () => {
    render(<HomePage />)
    const heading = await screen.findByText('The Verdant Veil')
    expect(heading.tagName).toEqual('H1')
  })
})
