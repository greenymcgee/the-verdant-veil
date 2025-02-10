import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { NEW_GAME } from '@/test/fixtures'
import { gamesServer, mockGameCreateRequestFailure } from '@/test/servers'

import { NewGameModal } from '..'

beforeAll(() => gamesServer.listen())
afterAll(() => gamesServer.close())
afterEach(() => gamesServer.resetHandlers())

describe('<NewGameModal />', () => {
  it('should render a cancel button', async () => {
    render(<NewGameModal />)
    fireEvent.click(screen.getByTestId('new-game-button'))
    fireEvent.click(screen.getByText('Cancel'))
    await waitFor(() => expect(screen.getByText('Generate')).not.toBeVisible())
  })

  describe('success', () => {
    it('should render a form for creating a game', async () => {
      render(<NewGameModal />)
      fireEvent.click(screen.getByTestId('new-game-button'))
      await userEvent.type(screen.getByTestId('igdb-id-input'), '1359')
      fireEvent.click(screen.getByText('Generate'))
      await waitForElementToBeRemoved(() => screen.getByRole('alert'))
      expect(mockRouter.pathname).toEqual(ROUTES.adminEditGame(NEW_GAME.slug))
    })
  })

  describe('failure', () => {
    it('should render a message to the user', async () => {
      const { message } = mockGameCreateRequestFailure()
      render(<NewGameModal />)
      fireEvent.click(screen.getByTestId('new-game-button'))
      await userEvent.type(screen.getByTestId('igdb-id-input'), '1359')
      fireEvent.click(screen.getByText('Generate'))
      await waitForElementToBeRemoved(() =>
        screen.getByRole('alert', { name: 'Loading' }),
      )
      expect(screen.getByText(message)).toBeVisible()
    })
  })
})
