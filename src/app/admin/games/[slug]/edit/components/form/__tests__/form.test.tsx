import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { SUPER_METROID } from '@/test/fixtures'
import { toastMock } from '@/test/helpers'
import { gamesServer, mockGameUpdateRequestFailure } from '@/test/servers'

import { EditGameForm } from '..'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<EditGameForm />', () => {
  it('should render a form that allows the user to edit a game', async () => {
    render(<EditGameForm game={SUPER_METROID} />)
    fireEvent.change(
      screen.getByTestId('review').querySelector('[role="textbox"]') as Element,
      {
        target: { textContent: 'updated' },
      },
    )
    fireEvent.change(screen.getByTestId('rating-input'), {
      currentTarget: { value: '5' },
    })
    fireEvent.click(screen.getByTestId('submit-game-update-button'))
    await waitForElementToBeRemoved(screen.getByRole('alert'))
    expect(mockRouter.pathname).toBe(ROUTES.adminGame(SUPER_METROID.slug))
  })

  it('should toast a message to the user upon failure', async () => {
    const { message } = mockGameUpdateRequestFailure()
    render(<EditGameForm game={SUPER_METROID} />)
    fireEvent.change(screen.getByTestId('review'), {
      editor: { getHTML: () => '<p>Updated</p>' },
    })
    fireEvent.click(screen.getByTestId('submit-game-update-button'))
    await waitForElementToBeRemoved(screen.getByRole('alert'))
    expect(toastMock.error).toHaveBeenCalledWith(message)
  })
})
