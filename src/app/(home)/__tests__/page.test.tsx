import React from 'react'
import { render, screen } from '@testing-library/react'

import { homeServer } from '@/test/servers'

import HomePage from '../page'

beforeAll(() => homeServer.listen())
afterEach(() => homeServer.resetHandlers())
afterAll(() => homeServer.close())

describe('<HomePage />', () => {
  it('should render an h1', () => {
    render(<HomePage />)
    expect(screen.getByText('The Verdant Veil').tagName).toEqual('H1')
  })
})
