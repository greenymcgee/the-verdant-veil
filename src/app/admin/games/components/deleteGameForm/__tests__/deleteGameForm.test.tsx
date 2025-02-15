import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { useGetGamesQuery } from '@/hooks/api'
import { SUPER_METROID } from '@/test/fixtures'
import { toastMock } from '@/test/helpers'
import {
  gamesServer,
  mockGameDeleteRequestFailure,
  mockGamesWithoutDeletedGameRequest,
} from '@/test/servers'

import { DeleteGameForm } from '../deleteGameForm'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

function Wrapper() {
  const { games } = useGetGamesQuery()
  return (
    <>
      {games.map((game) => (
        <DeleteGameForm game={game} key={game.id} />
      ))}
    </>
  )
}

describe('<DeleteGameForm />', () => {
  describe('success', () => {
    it('should mutate the games index data and toast a message', async () => {
      render(<Wrapper />)
      await screen.findByLabelText(`Delete ${SUPER_METROID.name}`)
      mockGamesWithoutDeletedGameRequest()
      const submitButton = screen.getByLabelText(`Delete ${SUPER_METROID.name}`)
      fireEvent.click(submitButton)
      await waitFor(() => {
        expect(toastMock.success).toHaveBeenCalledWith(
          `${SUPER_METROID.name} was deleted`,
        )
      })
    })
  })

  describe('failure', () => {
    it('should toast a message', async () => {
      const { message } = mockGameDeleteRequestFailure()
      render(<DeleteGameForm game={SUPER_METROID} />)
      const submitButton = screen.getByLabelText(`Delete ${SUPER_METROID.name}`)
      fireEvent.click(submitButton)
      await waitFor(() => expect(toastMock.error).toHaveBeenCalledWith(message))
    })
  })
})
